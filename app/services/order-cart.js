import Ember from 'ember';
import config from '../config/environment';
import RandomString from 'aeonvera/mixins/helpers/string';

export default Ember.Service.extend(RandomString, {
  store: Ember.inject.service('store'),
  session: Ember.inject.service('session'),
  flashMessages: Ember.inject.service('flashMessages'),

  userFirstName: '',
  userLastName: '',
  email: '',
  order: null,
  host: null,

  userName: Ember.computed('userFirstName', 'userLastName', function() {
    return this.get('userFirstName') + ' ' + this.get('userLastName');
  }),

  userEmail: Ember.computed('session.currentUser', 'email', function() {
    let email = this.get('email');
    if (!Ember.isPresent(email)) {
      let userEmail = this.get('session.currentUser.email');
      email = userEmail;
    }

    return email;
  }),

  syncEmail: Ember.observer('userEmail', function() {
    this.set('currentOrder.userEmail', this.get('userEmail'));
  }),

  syncName: Ember.observer('userName', function() {
    this.set('currentOrder.userName', this.get('userName'));
  }),

  hasItems: Ember.computed('order', 'order.hasLineItems', function() {
    let order = this.get('order');
    return (Ember.isPresent(order) && order.get('hasLineItems'));
  }),

  items: Ember.computed('order.orderLineItems.@each', function() {
    return this.get('order.orderLineItems');
  }),

  /*
    TODO: this logic kinda sucks -- find a way to break it up
  */
  currentOrder: Ember.computed('order', function() {
    let order = this.get('order');
    if (!Ember.isPresent(order)) {
      let user = this.get('session.currentUser');
      let orderId = this.get('orderId');

      if (Ember.isPresent(orderId)) {
        order = this.get('store').peekRecord('order', orderId);
      }

      if (!Ember.isPresent(order)) {
        order = this.get('store').createRecord('order', {
          host: this.get('host'),
          user: user,
          userName: this.get('userName'),
          userEmail: this.get('userEmail'),
        });
      }

      let token = this.get('token');
      if (Ember.isBlank(user)) {
        order.set('paymentToken', this.randomString('order', 128));
      } else if (Ember.isPresent(token)) {
        order.set('paymentToken', token);
      }

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
    let order = this.get('order');
    if (order.get('isNew')) {
      order.unloadRecord();
    } else {
      order.destroyRecord();
      order.save();
    }

    this.set('order', null);
  },

  // unfortunately, ember / JSON API doesn't have a way to
  // send multiple records at a time -- which is what we need
  // in the case of order + order line items...
  // so, this is pretty much a hack -- luckily, it shouldn't
  // be needed anywhere else
  checkout() {
    let order = this.get('order');

    let jsonPayload = {};
    let items = [];
    let isNew = order.get('isNew');
    let ajaxVerb = isNew ? 'POST' : 'PUT';
    let store = this.get('store');
    let url = isNew ? '/api/orders' : '/api/orders/' + order.get('id')  + '/modify';

    order.get('orderLineItems').forEach(item => {
      let itemJson = item.toJSON();
      itemJson.id = item.get('id');
      itemJson.lineItemId = item.get('lineItem.id');
      itemJson.lineItemType = item.get('lineItem.klass');
      items.push(itemJson);
    });

    jsonPayload.order = order.toJSON();
    jsonPayload.order.hostId = this.get('order.host.id');
    jsonPayload.order.hostType = this.get('order.host.klass');
    jsonPayload.orderLineItems = items;

    let authToken = this.get('session.data.authenticated.token');
    let token = this.get('order.paymentToken');

    let promise = new Ember.RSVP.Promise((resolve, reject) => {
      Ember.$.ajax({
        type: ajaxVerb,
        url: config.host + url,
        data: jsonPayload,
        beforeSend: xhr => {
          xhr.setRequestHeader('Authorization', 'Bearer ' + authToken);
        }
      }).then(response => {
        let id = response.data.id;
        store.pushPayload(response);
        let order = store.peekRecord('order', id);

        // For authorizing edits, we need to add the token to the URL
        // luckily, we have it bound already
        if (Ember.isPresent(token)) {
          order.set('paymentToken', token);
        }

        // have to re-set the order variable to the new order
        // because otherwise the order property remains
        // the non-server-backed version
        this.set('order', order);
        resolve(order);
      }, error => {

        reject(error);
      });
    });

    return promise;
  },
});
