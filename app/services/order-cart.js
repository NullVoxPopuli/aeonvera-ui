import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service('store'),
  session: Ember.inject.service('session'),
  flashMessages: Ember.inject.service('flashMessages'),

  userFirstName: '',
  userLastName: '',
  email: '',
  order: null,
  host: null,

  userName: Ember.computed('userFirstName', 'userLastName', function() {
    return this.get('userFirstName') + this.get('userLastName');
  }),

  userEmail: Ember.computed('session.currentUser', {
    get(key) {
      let email = this.get('email');
      if (!Ember.isPresent(email)) {
        let userEmail = this.get('session.currentUser.email');
        email = userEmail;
        this.set('email', email);
      }

      return email;
    },

    set(key, value) {
      this.set('email', value);
    }
  }),

  hasItems: Ember.computed('order', 'order.hasLineItems', function() {
    let order = this.get('order');
    return (Ember.isPresent(order) && order.get('hasLineItems'));
  }),

  items: Ember.computed('order.orderLineItems.@each', function() {
    return this.get('order.orderLineItems');
  }),

  currentOrder: Ember.computed('order', function() {
    let order = this.get('order');
    if (!Ember.isPresent(order)) {
      let user = this.get('session.currentUser');
      order = this.get('store').createRecord('order', {
        host: this.get('host'),
        user: user,
        userName: this.get('userName'),
        userEmail: this.get('userEmail'),
      });

      this.set('order', order);
    }

    return order;
  }),

  add(item, quantity = 1) {
    let order = this.get('currentOrder');
    this.get('order').addLineItem(item, quantity);
  },

  remove(item) {
    let order = this.get('order');
    order.removeOrderLineItem(item);
    if (!order.get('hasLineItems')) { this.cancel(); }
  },

  cancel() {
    this.get('order').unloadRecord();
    this.set('order', null);
  },

  submit() {

  },

  /*
    the params here is the response from the stripe-checkout script.
    We'll want to add this in to the order before, and show some sort of visual
    feedback for processing, as this data only enables us to charge the card.
    The server will do the actual charging of the card.

    The only data we need from the stripe checkout object is the 'id'
  */
  processStripeToken(params) {
    let token = params.id;
    this.get('order').set('checkoutToken', token);

    // by attempting to save,
    // the server is going to validate all the objects,
    // attempt to change the card.
    //
    // if nothing has gone wrong at this point, everything will sove
    // and an email will be sent to the registrant.
    //
    // if there are errors (either in model validation or credit card),
    // the user will be notified of all errors.
    // ---------------------------------------------------------------
    // unfortunately, ember / JSON API doesn't have a way to
    // send multiple records at a time -- which is what we need
    // in the case of order + order line items...
    // so, this is pretty much a hack -- luckily, it shouldn't
    // be needed anywhere else
    let jsonPayload = {};
    let items = [];

    this.get('order.orderLineItems').forEach(item => {
      items.push(item.toJSON());
    });

    jsonPayload.order = this.get('order').toJSON();
    jsonPayload.orderLineItems = items;
    console.log(jsonPayload);

    this.get('order').save().then(record => {

      /*
        Display some sort of thankyou
        - TODO: in the email, there should probably be some sort of
                readonly link to the order
      */

      let msg = 'The order was successful. You should soon receive a receipt in your email.';
      this.get('flashMessages').success(msg);
    }, error => {

      this.get('flashMessages').alert(error);
      console.error(error);
    });
  }

});
