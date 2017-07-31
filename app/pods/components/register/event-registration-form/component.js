import Ember from 'ember';

const { inject, computed, observer } = Ember;

export default Ember.Component.extend({
  session: Ember.inject.service(),
  store: Ember.inject.service(),
  event: Ember.computed.alias('model'),
  cart: Ember.inject.service('order-cart'),

  housingResponse: Ember.computed('registration', function() {
    const housingRequest = this.get('registration.housingRequest');
    const housingProvision = this.get('registration.housingProvision');

    return housingRequest ? 2 : (housingProvision ? 1 : 0);
  }),
  isWaivingHousing: Ember.computed.equal('housingResponse', 0),
  isProvidingHousing: Ember.computed.equal('housingResponse', 1),
  isRequestingHousing: Ember.computed.equal('housingResponse', 2),

  selectedPackage: null,
  selectedLevel: null,
  registration: null,

  housingRequest: null,
  housingProvision: null,
  housingObserver: Ember.observer('housingResponse', function() {
    const housingResponse = this.get('housingResponse');

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

  findAttendance: function() {
    const eventId = this.get('event.id');
    const store = this.get('store');

    // this should include the orders, housing_provision and housing_request
    store.queryRecord('registration', {
      current_user: true, event_id: eventId }).then(registration => {
      const cart = this.get('cart');

      // in case there is an existing order,
      // cancel it, and re-populate everything with our
      // own cart
      this.set('registration', registration);
      this.set('housingRequest', registration.get('housingRequest'));
      this.set('housingProvision', registration.get('housingProvision'));

      cart.set('registration', registration);
      const unpaidOrder = registration.get('unpaidOrder');

      // if the unpaid order isn't present, then don't set it
      // the unpaid order is a promise, which is unfulfilled
      // if it doesn't exist. But checking if the id is empty
      // seems more self-explanatory than checking isFulfilled
      if (Ember.isPresent(unpaidOrder.get('id'))) {
        cart.set('order', unpaidOrder);
      } else {
        cart.cancel();

        // create a new order -- how did they create an registration with no order?
        // - possibly validation issues on the order during save, and
        //   then a refresh may have happened before the order validation
        //   issues were resolved
        cart.set('host', this.get('model'));
        cart.get('currentOrder'); // builds an order.
      }

      // crappy logic to get the package radio buttons to show what was selected
      const packageId = registration.get('package.id');
      const registrationPackage = this.get('model.packages').findBy('id', packageId);

      this.set('selectedPackage', registrationPackage);

      // crappy logic to get the level radio buttons to show what was selected
      const levelId = registration.get('level.id');
      const registrationLevel = this.get('model.levels').findBy('id', levelId);

      this.set('selectedLevel', registrationLevel);
    }, error => {

      const registration = this.get('store').createRecord('registration');

      registration.set('host', this.get('event'));

      this.set('registration', registration);
      this.get('cart').set('registration', registration);
    });
  }.on('didInsertElement'),

  title: Ember.computed('model.name', function() {
    return 'Register for ' + this.get('model.name');
  }).readOnly(),

  // TODO: remove other packages, or provide an option on the event
  //       to force only registering for one
  //
  // This is for syncing the registration.package with the selected
  // package from the list of packages on the event
  //
  packageObserver: Ember.observer('selectedPackage', function() {
    const cart = this.get('cart');
    const registration = this.get('registration');
    const selectedPackage = this.get('selectedPackage');

    // in order to protect the model from getting dirtied upon load,
    // only add to the cart and change the registration if the
    // selected package is different
    if (registration.get('package.id') !== selectedPackage.get('id')) {
      cart.set('host', this.get('model'));
      cart.add(selectedPackage);
      registration.set('package', selectedPackage);
    }
  }),

  // This is for syncing the registration.level with the selected
  // level from the list of packages on the event
  //
  levelObserver: Ember.observer('selectedLevel', function() {
    this.get('registration').set('level', this.get('selectedLevel'));
  }),

  order: Ember.computed(function() {
    return this.store.createRecord('order');
  }),

  genderOptions: ['No Preference', 'Guys', 'Gals'],

  actions: {
    cancel() {
      this.get('router').transitionTo('register.index');
    },

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
    const housingRequest = this.get('registration.housingRequest');

    if (housingRequest && !housingRequest.get('isDeleted')) {
      housingRequest.destroyRecord();
      housingRequest.save();
      this.set('registration.housingRequest', null);
      this.set('housingRequest', null);
    }
  },

  _deleteHousingProvision() {
    const housingProvision = this.get('registration.housingProvision');

    if (housingProvision && !housingProvision.get('isDeleted')) {
      housingProvision.destroyRecord();
      housingProvision.save();
      this.set('registration.housingProvision', null);
      this.set('housingProvision', null);
    }
  },

  _setHousingProvision() {
    const registration = this.get('registration');
    let housingProvision = registration.get('housingProvision');

    if (housingProvision != null) {
      return housingProvision;
    }

    housingProvision = this.store.createRecord('housing-provision');
    registration.set('housingProvision', housingProvision);
    return housingProvision;
  },

  _setHousingRequest() {
    const registration = this.get('registration');
    let housingRequest = registration.get('housingRequest');

    if (housingRequest) {
      return housingRequest;
    }

    housingRequest = this.store.createRecord('housing-request');
    housingRequest.set('registration', registration);
    registration.set('housingRequest', housingRequest);
    return housingRequest;
  }

});
