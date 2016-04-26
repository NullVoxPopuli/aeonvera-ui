import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  store: Ember.inject.service(),
  event: Ember.computed.alias('model'),
  cart: Ember.inject.service('order-cart'),

  housingResponse: Ember.computed('attendance', function() {
    let housingRequest = this.get('attendance.housingRequest');
    let housingProvision = this.get('attendance.housingProvision');

    return !!housingRequest ? 2 : (!!housingProvision ? 1 : 0);
  }),
  isWaivingHousing: Ember.computed.equal('housingResponse', 0),
  isProvidingHousing: Ember.computed.equal('housingResponse', 1),
  isRequestingHousing: Ember.computed.equal('housingResponse', 2),

  selectedPackage: null,
  selectedLevel: null,
  attendance: null,

  housingRequest: null,
  housingProvision: null,
  housingObserver: Ember.observer('housingResponse', function() {
    let housingResponse = this.get('housingResponse');

    // delete both
    if (housingResponse === 0) {
      this._deleteHousingRequest();
      this._deleteHousingProvision();
    }

    // delete the housing request
    if (housingResponse === 1) {
      this._deleteHousingRequest();
      this._setHousingProvision();
    }

    // delete the housing provision
    if (housingResponse === 2) {
      this._deleteHousingProvision();
      this._setHousingRequest();
    }
  }),

  findAttendance: function () {
    let eventId = this.get('event.id');
    let store = this.get('store');

    // this should include the orders, housing_provision and housing_request
    store.queryRecord('event-attendance', {
      current_user: true, event_id: eventId }).then(attendance => {
        let cart = this.get('cart');

        // in case there is an existing order,
        // cancel it, and re-populate everything with our
        // own cart
        this.set('attendance', attendance);
        this.set('housingRequest', attendance.get('housingRequest'));
        this.set('housingProvision', attendance.get('housingProvision'));

        cart.set('attendance', attendance);
        let unpaidOrder = attendance.get('unpaidOrder');

        // if the unpaid order isn't present, then don't set it
        // the unpaid order is a promise, which is unfulfilled
        // if it doesn't exist. But checking if the id is empty
        // seems more self-explanatory than checking isFulfilled
        if (Ember.isPresent(unpaidOrder.get('id'))) {
          cart.set('order', unpaidOrder);
        } else {
          cart.cancel();

          // create a new order -- how did they create an attendance with no order?
          // - possibly validation issues on the order during save, and
          //   then a refresh may have happened before the order validation
          //   issues were resolved
          cart.set('host', this.get('model'));
          cart.get('currentOrder'); // builds an order.
        }

        // crappy logic to get the package radio buttons to show what was selected
        let packageId = attendance.get('package.id');
        let attendancePackage = this.get('model.packages').findBy('id', packageId);
        this.set('selectedPackage', attendancePackage);

        // crappy logic to get the level radio buttons to show what was selected
        let levelId = attendance.get('level.id');
        let attendanceLevel = this.get('model.levels').findBy('id', levelId);
        this.set('selectedLevel', attendanceLevel);
      }, error => {

        let attendance = this.get('store').createRecord('event-attendance');
        attendance.set('host', this.get('event'));

        this.set('attendance', attendance);
        this.get('cart').set('attendance', attendance);
      });
  }.on('didInsertElement'),

  // TODO: maybe eventually make requiring to login optional?
  mustLogin: Ember.computed('session.isAuthenticated', function() {
    let authed = this.get('session.isAuthenticated');
    return !authed;
  }),

  title: Ember.computed('model.name', function () {
    return 'Register for ' + this.get('model.name');
  }).readOnly(),

  // TODO: remove other packages, or provide an option on the event
  //       to force only registering for one
  //
  // This is for syncing the attendance.package with the selected
  // package from the list of packages on the event
  //
  packageObserver: Ember.observer('selectedPackage', function() {
    let cart = this.get('cart');
    let attendance = this.get('attendance');
    let selectedPackage = this.get('selectedPackage');

    // in order to protect the model from getting dirtied upon load,
    // only add to the cart and change the attendance if the
    // selected package is different
    if (attendance.get('package.id') !== selectedPackage.get('id')) {
      cart.set('host', this.get('model'));
      cart.add(selectedPackage);
      attendance.set('package', selectedPackage);
    }
  }),

  // This is for syncing the attendance.level with the selected
  // level from the list of packages on the event
  //
  levelObserver: Ember.observer('selectedLevel', function() {
    this.get('attendance').set('level', this.get('selectedLevel'));
  }),

  order: Ember.computed(function() {
    return this.store.createRecord('order');
  }),

  genderOptions: ['No Preference', 'Guys', 'Gals'],

  actions: {
    add: function(item) {
      this.get('cart').set('host', this.get('model'));
      this.get('cart').add(item);
    },

    addByQuantity(quantity, item) {
      this.get('cart').set('host', this.get('model'));
      this.get('cart').add(item, quantity);
    }
  },

  _deleteHousingRequest() {
    let housingRequest = this.get('attendance.housingRequest');

    if (housingRequest && !housingRequest.get('isDeleted')) {
      housingRequest.destroyRecord();
      housingRequest.save();
      this.set('attendance.housingRequest', null);
      this.set('housingRequest', null);
    }
  },

  _deleteHousingProvision() {
    let housingProvision = this.get('attendance.housingProvision');

    if (housingProvision && !housingProvision.get('isDeleted')) {
      housingProvision.destroyRecord();
      housingProvision.save();
      this.set('attendance.housingProvision', null);
      this.set('housingProvision', null);
    }
  },

  _setHousingProvision() {
    let attendance = this.get('attendance');
    let housingProvision = attendance.get('housingProvision');

    if (housingProvision != null) {
      return housingProvision;
    }

    housingProvision = this.store.createRecord('housing-provision');
    attendance.set('housingProvision', housingProvision);
    return housingProvision;
  },

  _setHousingRequest() {
    let attendance = this.get('attendance');
    let housingRequest = attendance.get('housingRequest');

    if (housingRequest) {
      return housingRequest;
    }

    housingRequest = this.store.createRecord('housing-request');
    housingRequest.set('attendance', attendance);
    attendance.set('housingRequest', housingRequest);
    return housingRequest;
  }

});
