import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  store: Ember.inject.service(),
  event: Ember.computed.alias('model'),
  cart: Ember.inject.service('order-cart'),

  housingResponse: 0,
  isWaivingHousing: Ember.computed.equal('housingResponse', 0),
  isProvidingHousing: Ember.computed.equal('housingResponse', 1),
  isRequestingHousing: Ember.computed.equal('housingResponse', 2),

  selectedPackage: null,
  selectedLevel: null,

  findAttendance: function () {
    let eventId = this.get('event.id');
    let store = this.get('store');

    // this should include the orders, housing_provision and housing_request
    store.queryRecord('event-attendance', {
      current_user: true, event_id: eventId, include: 'package,level,pricing_tier,attendee,unpaid_order' }).then(attendance => {
        this.set('attendance', attendance);
        this.get('cart').set('attendance', attendance);

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

  attendance: null,

  housingRequest: Ember.computed('attendance', function() {
    let attendance = this.get('attendance');
    let housingRequest = attendance.get('housingRequest');

    if (housingRequest.get('isFulfilled')) {
      return housingRequest;
    }

    housingRequest = this.store.createRecord('housing-request');
    attendance.set('housingRequest', housingRequest);
    return housingRequest;
  }),

  housingProvision: Ember.computed(function() {
    let attendance = this.get('attendance');
    let housingProvision = attendance.get('housingProvision');

    if (housingProvision.get('isFulfilled')) {
      return housingProvision;
    }

    housingProvision = this.store.createRecord('housing-provision');
    attendance.set('housingProvision', housingProvision);
    return housingProvision;
  }),

  // TODO: remove other packages, or provide an option on the event
  //       to force only registering for one
  //
  // This is for syncing the attendance.package with the selected
  // package from the list of packages on the event
  //
  packageObserver: Ember.observer('selectedPackage', function() {
    this.get('cart').set('host', this.get('model'));
    this.get('cart').add(this.get('selectedPackage'));
    this.get('attendance').set('package', this.get('selectedPackage'));
  }),

  // This is for syncing the attendance.level with the selected
  // level from the list of packages on the event
  //
  levelObserver: Ember.observer('selectedLevel', function(){
    this.get('attendance').set('level', this.get('selectedLevel'));
  }),

  order: Ember.computed(function() {
    return this.store.createRecord('order');
  }),

  actions: {
    add: function(item) {
      this.get('cart').set('host', this.get('model'));
      this.get('cart').add(item);
    },

    addByQuantity(quantity, item) {
      this.get('cart').set('host', this.get('model'));
      this.get('cart').add(item, quantity);
    }
  }
});
