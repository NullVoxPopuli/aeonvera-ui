import Ember from 'ember';

export default Ember.Component.extend({
  queryText: '',
  showOnlyNonCheckedIn: false,
  showOnlyThoseWhoOweMoney: false,

  activeRegistrant: null,

  columns: [
    {property: 'attendeeName', title: 'Name'},
    {property: 'isCheckedIn', title: '', sort: false},
    {property: 'packageName', title: 'Package', sort: false},
    {property: 'levelName', title: 'Track', sort: false},
    {property: '', title: 'Competitions', sort: false},
    {property: 'amountOwed', title: '$ Owed', sort: false},
    {property: 'registeredAt', title: 'Date Registered'},
    {property: 'checkedInAt', title: 'Checked in at'}
  ],

  attendances: function() {
    const model = this.get('model');
    const query = this.get('queryText');
    const queryPresent = Ember.isPresent(query);
    const onlyNonCheckedIn = this.get('showOnlyNonCheckedIn');
    const onlyOweMoney = this.get('showOnlyThoseWhoOweMoney');
    const lowerQuery = query.toLowerCase();

    let filtered = model;

    if (onlyNonCheckedIn) {
      filtered = filtered.filterBy('isCheckedIn', false);
    }

    if (onlyOweMoney) {
      filtered = filtered.filterBy('owesMoney');
    }

    if (queryPresent) {
      filtered = filtered.filter(function(ea) {
        const name = ea.get('attendeeName').toLowerCase();

        return name.includes(lowerQuery);
      });
    }

    return filtered;
  }.property(
    'model', 'queryText',
    'showOnlyNonCheckedIn', 'showOnlyThoseWhoOweMoney'),

  percentCheckedIn: function() {
    const checkedIn = this.get('numberCheckedIn');
    /* var checkedOut = this.get('numberCheckedOut'); */
    const total = this.get('model').get('length');
    const percent = checkedIn / total * 100;

    return Math.round(percent, 2);
  }.property('model.@each.isCheckedIn'),

  numberCheckedIn: function() {
    const model = this.get('model');

    return model.filterBy('isCheckedIn').get('length');
  }.property('model.@each.isCheckedIn'),

  numberNotCheckedIn: function() {
    const model = this.get('model');

    return model.filterBy('isCheckedIn', false).get('length');
  }.property('model.@each.isCheckedIn'),

  actions: {

    setActiveRegistrant: function(attendance) {
      this.set('activeRegistrant', attendance);
    }
  }

});
