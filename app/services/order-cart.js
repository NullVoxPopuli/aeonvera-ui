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
  attendance: null,

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
          attendance: this.get('attendance')
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
    this._adjustCartMaxHeight();
  },

  remove(item) {
    let order = this.get('currentOrder');
    order.removeOrderLineItem(item);
    if (!order.get('hasLineItems')) { this.cancel(); }
    this._adjustCartMaxHeight();

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


  _adjustCartMaxHeight(){
    let cart = jQuery('.fixed-to-top-cart');
    let windowHeight = jQuery(window).height();

    // cart might not be rendered right now
    if (cart.length === 0){
      return;
    }

    let cartTop = cart.position().top;
    let cartHeight = cart.height();
    let cartBottom = cartTop + cartHeight;
    let cartTBody = cart.find('tbody');
    let cartTBodyHeight = cartTBody.height();
    let cartUiHeight = cartHeight - cartTBodyHeight;
    let cartUiHeightWithTop = cartUiHeight + cartTop;
    let availableHeight = windowHeight - cartUiHeightWithTop;

    cartTBody.css({maxHeight: availableHeight + 'px'});
  },

  // Validate the
  // - Order
  // - OrderLineItems
  // - Attendance, if applicable
  validate(){
    let order = this.get('order');
    let isOrderValid = order.validate();
    order.get('orderLineItems').map(item => {
      let isItemValid = item.validate();
      isOrderValid = isOrderValid && isItemValid;
    });

    let attendance = this.get('attendance');
    if (Ember.isPresent(attendance)){
      let isAttendanceValid = attendance.validate();
      isOrderValid = isOrderValid && isAttendanceValid;
    }

    return isOrderValid;
  },

  // unfortunately, ember / JSON API doesn't have a way to
  // send multiple records at a time -- which is what we need
  // in the case of order + order line items...
  // so, this is pretty much a hack -- luckily, it shouldn't
  // be needed anywhere else
  checkout() {
    // Client-side validation must pass before we try to send to the server
    if (!this.validate()){
      let failure = new Ember.RSVP.Promise((resolve, reject) => {
        reject(null);
      });

      return failure;
    }
    let order = this.get('order');

    // 1. save the attendance and nested data
    //    - housing request
    //    - housing response
    //    - custom field responses
    // TODO: extract to method
    let attendance = this.get('attendance');
    attendance.save().then(attendanceRecord => {
      // 2. save the order and nested data
      //    - order line items
      // TODO: extract to method
        order.set('attendance', this.get('attendance'));
    }, error => {

    });

    return order.save();

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
    jsonPayload.attendance = order.get('attendance').toJSON();
    jsonPayload.attendance.hostId = this.get('order.host.id');
    jsonPayload.attendance.hostType = this.get('order.host.klass');

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
