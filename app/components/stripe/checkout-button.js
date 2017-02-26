import Ember from 'ember';

const { isPresent, isBlank } = Ember;

/*
  The stripe script sends a submit action to it's containing form.
  So, we must have a form.

  A stripe form requires an event, and an order.

  event:
    - id and class name to send to the rails server to scope the order by
    - the integration for the publishable key
    - description of purchase (event name)
  order:
    - for getting the amount due, and for using the id to update the server
    - for email to send a receipt

  given an order, all 3 of the above objects should be available
*/
export default Ember.Component.extend({
  label: 'Pay with card',

  host: Ember.computed('model', function () {
    return this.get('model.host');
  }),

  image: Ember.computed('host', function () {
    return this.get('host.loguUrlMedium');
  }),

  key: Ember.computed('host', function () {
    return this.get('host.stripePublishableKey');
  }),

  emailForReceipt: Ember.computed('model', function () {
    let email = this.get('email');

    if (!Ember.isPresent(email)) {
      email = this.get('model.userEmail');
    }

    this.set('model.checkoutEmail', email);
    return email;
  }),

  description: Ember.computed('host', function () {
    return this.get('host.name');
  }),

  paymentAmountOverride: null,
  amountInCents: Ember.computed('model', 'model.totalInCents', 'model.total', 'paymentAmountOverride', function () {
    // return (this.get('model.totalInCents') || (this.get('model.total') * 100));
    let paymentOverride = this.get('paymentAmountOverride');
    if (isPresent(paymentOverride)) {
      return paymentOverride * 100;
    }

    return this.get('model.total') * 100;
  }),

  actions: {
    /**
     * Receives a Stripe token after checkout succeeds
     * The token looks like this https://stripe.com/docs/api#tokens
     */
    processStripeToken: function (args) {
      this.get('targetObject').send('processStripeToken', args);
    },
  },

});
