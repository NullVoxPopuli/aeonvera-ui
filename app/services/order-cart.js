import Ember from 'ember';
import config from '../config/environment';

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

  // unfortunately, ember / JSON API doesn't have a way to
  // send multiple records at a time -- which is what we need
  // in the case of order + order line items...
  // so, this is pretty much a hack -- luckily, it shouldn't
  // be needed anywhere else
  checkout(){
    let order = this.get('order');
    order.save().then(record => {
      record.get('orderLineItems').save().then(_ => {
        this.redirectTo('register.checkout', record.get('id'));
      });
    }, error => {
      //   // TODO: have a more prevelant place to display these errors
      //   // TODO: What errors could show up here?
        this.get('flashMessages').alert(error);
        console.error(error);
    })

    //
    // let jsonPayload = {};
    // let items = [];
    //
    // this.get('order.orderLineItems').forEach(item => {
    //   let itemJson = item.toJSON();
    //   itemJson.lineItemId = item.get('lineItem.id');
    //   itemJson.lineItemType = item.get('klass');
    //   items.push(itemJson);
    // });
    //
    // jsonPayload.order = this.get('order').toJSON();
    // jsonPayload.order.hostId = this.get('order.host.id');
    // jsonPayload.order.hostType = this.get('order.host.klass');
    // jsonPayload.orderLineItems = items;
    //
    // Ember.$.ajax({
    //   type: 'POST',
    //   url: config.host + '/api/orders',
    //   data: jsonPayload
    // }).then(record => {
    //   // redirect to the checkout screen
    //   this.redirectTo('register.checkout', record.get('id'));
    // }, error => {
    // });
  },

  /*
    the params here is the response from the stripe-checkout script.
    We'll want to add this in to the order before, and show some sort of visual
    feedback for processing, as this data only enables us to charge the card.
    The server will do the actual charging of the card.

    The only data we need from the stripe checkout object is the 'id'

    NOTE: The order should already be saved before entering this method.
  */
  processStripeToken(params) {
    let token = params.id;
    let order = this.get('order');
    order.set('checkoutToken', token);

    // by saving, the server is going to attempt to charge the card,
    //
    // if nothing has gone wrong with the payment
    // and an email will be sent to the registrant.
    //
    // if there are errors with the credit card,
    // the user must be notified
    order.save().then(record => {

      /*
        Display some sort of thankyou
        - TODO: in the email, there should probably be some sort of
                readonly link to the order
      */

      // redirect to success
      let msg = 'The order was successful. You should soon receive a receipt in your email.';
      this.get('flashMessages').success(msg);
    }, error => {
      // set the errors object, and the component using this service
      // is responsible for showing those
      this.get('flashMessages').alert(error);
      console.error(error);
    });
  }

});
