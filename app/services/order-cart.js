import Ember from 'ember';
import config from '../config/environment';
import RandomString from 'aeonvera/mixins/helpers/string';

export default Ember.Service.extend(RandomString, {
  store:         Ember.inject.service('store'),
  session:       Ember.inject.service('session'),
  flashMessages: Ember.inject.service('flashMessages'),

  userFirstName: '',
  userLastName:  '',
  email:         '',
  order:         null,
  host:          null,
  attendance:    null,

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

  currentOrderAsPromise: Ember.computed('currentOrder', function() {
    return this.get('currentOrder').asPromiseObject();
  }),

  add(item, quantity = 1) {
    this.get('currentOrderAsPromise').then(order => {
      order.addLineItem(item, quantity);
      this._adjustCartMaxHeight();
    });
  },

  remove(item) {
    this.get('currentOrderAsPromise').then(order => {
      order.removeOrderLineItem(item);
      if (!order.get('hasLineItems')) { this.cancel(); }

      this._adjustCartMaxHeight();
    });
  },

  cancel() {
    let order = this.get('order');
    if (order == null) return;

    this.get('currentOrderAsPromise').then(order => {
      if (order.get('isNew')) {
        order.unloadRecord();
      } else {
        order.destroyRecord();
        order.save();
      }

      this.set('order', null);
    });
  },

  _adjustCartMaxHeight() {
    let cart = jQuery('.fixed-to-top-cart');
    let windowHeight = jQuery(window).height();

    // cart might not be rendered right now
    if (cart.length === 0) {
      return;
    }

    let cartTop             = cart.position().top;
    let cartHeight          = cart.height();
    let cartBottom          = cartTop + cartHeight;
    let cartTBody           = cart.find('tbody');
    let cartTBodyHeight     = cartTBody.height();
    let cartUiHeight        = cartHeight - cartTBodyHeight;
    let cartUiHeightWithTop = cartUiHeight + cartTop;
    let availableHeight     = windowHeight - cartUiHeightWithTop;

    cartTBody.css({ maxHeight: availableHeight + 'px' });
  },

  // Validate the
  // - Order
  // - OrderLineItems
  // - Attendance, if applicable
  validate() {
    return this.get('currentOrderAsPromise').then(order => {
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
    });
  },

  // This method must return a promise
  checkout() {
    // Client-side validation must pass before we try to send to the server
    return this.validate().then(isValidated => {
      if (!isValidated) {
        return null;
      }

      let attendance = this.get('attendance');

      // this will first save the attendance, housing info, field responses
      // and then it will shoot off another request to save the order and items
      if (Ember.isPresent(attendance)) {
        // don't save if we have nothing to save
        if (this._isAttendanceDirty()) {
          return this._saveAttendance();
        }
      }

      // if the attendance isn't set -- odds are, we don't need it.
      // just save the order
      return this._saveOrder();
    });
  },

  // this method must return a promise
  // TODO: this method sucks. Fix it.
  _saveOrder() {
    return this.get('currentOrderAsPromise').then(order => {

      // 2. save the order and nested data
      //    - order line items
      order.set('attendance', this.get('attendance'));

      // TODO: how to send to modify URL if not new
      // - maybe set a flag on the item to be read by the server?
      let promise = new Ember.RSVP.Promise((resolve, reject) => {
        let token = this.get('order.paymentToken');

        this._saveOrderLineItems();

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
    });
  },

  _saveAttendance() {

    // 1. save the attendance and nested data
    //    - housing request
    //    - housing provision
    //    - custom field responses
    let attendance = this.get('attendance');
    this._saveAttendanceItems();

    let promise = attendance.save().then(attendanceRecord => {
      this.set('attendance', attendanceRecord);
      return this._saveOrder();
    }, error => {
      let msg = 'Attendance could not be saved.';
      this.get('flashMessages').alert(msg);
      console.error(error);
    });

    return promise;
  },

  // Check the following for dirtyness
  // - attendance
  // - housing request
  // - housing provision
  // - each custom field response
  _isAttendanceDirty() {

    let attendance = this.get('attendance');

    let isDirty = attendance.get('hasDirtyAttributes');
    isDirty     = isDirty || attendance.get('housingRequest.hasDirtyAttributes');
    isDirty     = isDirty || attendance.get('housingProvision.hasDirtyAttributes');
    isDirty     = isDirty || attendance.get('customFieldResponses').isAny('hasDirtyAttributes', true);

    return isDirty;
  },

  // Optionally save the order line items
  // in order to save the order line items, the order must first
  // be persisted
  // This should only be done as an overall 'update' to the collection
  // of order+orderLineItems
  _saveOrderLineItems() {
    this.get('currentOrderAsPromise').then(order => {
      if (order.get('isPersisted')) {
        let orderLineItems = order.get('orderLineItems');
        orderLineItems.forEach(item => {
          if (item.get('hasDirtyAttributes')) {
            item.save();
          }
        });
      }
    }, error => {
      // panic?
    });
  },

  // Optionally save the attendance items
  // In order to save these, the attendance must first be persisted.
  // This should only be d one as an overall update to the
  // attendance + housing + custom field responses
  _saveAttendanceItems() {
    let attendance = this.get('attendance');
    if (attendance.get('isPersisted')) {
      // TODO: error handling?
      this._saveHousingRequest();
      this._saveHousingProvision();
      this._saveCustomFieldResponses();
    }
  },

  _saveHousingRequest() {
    let housingRequest = this.get('attendance.housingRequest');

    if (housingRequest && housingRequest.get('hasDirtyAttributes')) {
      housingRequest.save();
    }
  },

  _saveHousingProvision() {
    let housingProvision = this.get('attendance.housingProvision');

    if (housingProvision && housingProvision.get('hasDirtyAttributes')) {
      housingProvision.save();
    }
  },

  _saveCustomFieldResponses() {
    let customFieldResponses = this.get('attendance.customFieldResponses');

    if (Ember.isPresent(customFieldResponses)) {
      customFieldResponses.forEach(item => {
        if (item.get('hasDirtyAttributes')) {
          item.save();
        }
      });
    }
  }
});
