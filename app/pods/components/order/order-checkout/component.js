import Ember from 'ember';
import computed, { alias } from 'ember-computed-decorators';
import { PropTypes } from 'ember-prop-types';

import { messageFromError } from 'aeonvera/helpers/message-from-error';

export default Ember.Component.extend({
  propTypes: {
    model: PropTypes.EmberObject.isRequired,
    token: PropTypes.string
  },
  store: Ember.inject.service('store'),
  cart: Ember.inject.service('order-cart'),
  email: Ember.computed.oneWay('cart.userEmail'),

  // Set when in the process of paying / waiting on stripe.
  // This triggers an overlay that prevents the user from
  // clicking anything.
  showPaymentInProgress: false,

  // set by discount field
  discountCode: '',

  // set by failure to apply discount
  discountApplicationErrors: null,

  @computed('model.host.name')
  statementDescription(hostName) {
    if (hostName.length > 15) {
      return hostName.substring(0, 15);
    }

    return hostName;
  },

  @computed('model.host')
  hostPath(host) {
    if (host.get('isEvent')) {
      return 'register.event-registration.show.edit';
    }

    return 'register.community-registration.register.show.edit';
  },

  @computed('model.host', 'model')
  editModel(host, model) {
    if (host.get('isEvent')) {
      return model.get('attendance');
    }

    return model;
  },

  willRender() {
    this._super(...arguments);
    this.get('cart').set('order', this.get('model'));
  },

  /*
    for unauthenticated orders
  */
  _setOrderTokenIfPresent(order) {
    const token = this.get('token');

    if (Ember.isPresent(token)) {
      order.set('paymentToken', this.get('token'));
    }
  },

  actions: {
    finishedOrder() {
      this.get('router').transitionTo('register.checkout.thankyou');
    },

    applyDiscount() {
      const discountCode = this.get('discountCode');
      const store = this.get('store');
      const order = this.get('model');
      const host = order.get('host');

      const params = {
        order,
        hostId: host.get('id'),
        hostType: host.get('klass'),
        discountCode: discountCode
      };

      const discount = store.createRecord('orderLineItem', params);

      return discount.save()
        .then(discount => this.set('discountCode', ''))
        .catch(error => this.set(
          'discountApplicationErrors',
          messageFromError(error, (title, detail) => detail)));
    },

    /*
      the params here is the response from the stripe-checkout script.
      We'll want to add this in to the order before, and show some sort of visual
      feedback for processing, as this data only enables us to charge the card.
      The server will do the actual charging of the card.

      The only data we need fro
      }m the stripe checkout object is the 'id'

      NOTE: The order should already be saved before entering this method.
    */
    processStripeToken(params) {
      const checkoutToken = params.id;
      const order = this.get('model');

      order.set('checkoutToken', checkoutToken);
      this._setOrderTokenIfPresent(order);
      this.set('showPaymentInProgress', true);

      // by saving, the server is going to attempt to charge the card,
      //
      // if nothing has gone wrong with the payment
      // and an email will be sent to the registrant.
      //
      // if there are errors with the credit card,
      // the user must be notified
      //
      // TODO: extract to controller
      order
        .save({ adapterOptions: { payment_token: this.get('token') } })
        .then(record => {
          this.set('showPaymentInProgress', false);
          this.get('router').transitionTo('register.checkout.thankyou');
      }, error => {
        // model's error object is used.
        this.get('flashMessages').alert(error);
        this.set('showPaymentInProgress', false);
      });
    }

  }
});
