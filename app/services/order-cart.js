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
    order.addLineItem(item, quantity);
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
    if (order == null) return;

    if (order.get('isNew')) {
      order.unloadRecord();
    } else {
      order.destroyRecord();
      order.save();
    }

    this.set('order', null);
  },

  _adjustCartMaxHeight() {
    let cart = jQuery('.fixed-to-top-cart');
    let windowHeight = jQuery(window).height();

    // cart might not be rendered right now
    if (cart.length === 0) {
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

    cartTBody.css({ maxHeight: availableHeight + 'px' });
  },

  // Validate the
  // - Order
  // - OrderLineItems
  // - Attendance, if applicable
  validate() {
    let order = this.get('order');

    // upon edit, order is a PromiseObject, rather than a raw class (like in
    // a new registration)
    order = order.isFulfilled ? order.content : order;

    let isOrderValid = order.validate();
    order.get('orderLineItems').map(item => {
      let isItemValid = item.validate();
      isOrderValid = isOrderValid && isItemValid;
    });

    let attendance = this.get('attendance');
    if (Ember.isPresent(attendance)) {
      let isAttendanceValid = attendance.validate();
      isOrderValid = isOrderValid && isAttendanceValid;
    }

    return isOrderValid;
  },

  // This method must return a promise
  checkout() {
    // Client-side validation must pass before we try to send to the server
    if (!this.validate()) {
      return new Ember.RSVP.Promise((resolve, reject) => {
        reject(null);
      });
    }

    let attendance = this.get('attendance');
    // this will first save the attendance, housing info, field responses
    // and then it will shoot off another request to save the order and items
    if (Ember.isPresent(attendance)) {
      // don't save if we have nothing to save
      if (attendance.get('hasDirtyAttributes')) {
        return this._saveAttendance();
      }
    }

    // if the attendance isn't set -- odds are, we don't need it.
    // just save the order
    return this._saveOrder();
  },

  // this method must return a promise
  _saveOrder() {
    let order = this.get('order');

    // 2. save the order and nested data
    //    - order line items
    order.set('attendance', this.get('attendance'));

    // TODO: how to send to modify URL if not new
    // - maybe set a flag on the item to be read by the server?
    let promise = new Ember.RSVP.Promise((resolve, reject) => {
      let token = this.get('order.paymentToken');

      if (!order.get('hasDirtyAttributes')) {
        return resolve(order);
      }

      return order.save().then(order => {
        // For authorizing edits, we need to add the token to the URL
        // luckily, we have it bound already
        if (Ember.isPresent(token)) {
          order.set('paymentToken', token);
        }
        // remove order line items with a null id.
        order.removeItemsWithNullIds();
        resolve(order);
      }, error => {

        reject(error);
      });
    });

    return promise;
  },

  _saveAttendance() {

    // 1. save the attendance and nested data
    //    - housing request
    //    - housing response
    //    - custom field responses
    let attendance = this.get('attendance');
    let promise = attendance.save().then(attendanceRecord => {
      this.set('attendance', attendanceRecord);
      return this._saveOrder();
    }, error => {

      let msg = 'Attendance could not be saved.';
      this.get('flashMessages').alert(msg);
    });

    return promise;
  }
});
