import Ember from 'ember';

export default Ember.Component.extend({
  queryText: '',
  showOnlyNonCheckedIn: false,
  showOnlyThoseWhoOweMoney: false,

  activeRegistrant: null,

  attendances: function () {
    var model = this.get('model');
    var query = this.get('queryText');
    var queryPresent = Ember.isPresent(query);
    var onlyNonCheckedIn = this.get('showOnlyNonCheckedIn');
    var onlyOweMoney = this.get('showOnlyThoseWhoOweMoney');
    var lowerQuery = query.toLowerCase();

    var filtered = model;

    if (onlyNonCheckedIn) {
      filtered = filtered.filterBy('isCheckedIn', false);
    }

    if (onlyOweMoney) {
      filtered = filtered.filterBy('owesMoney');
    }

    if (queryPresent) {
      filtered = filtered.filterBy('attendeeName', function (ea) {
        var name = ea.get('attendeeName').toLowerCase();
        return name.indexOf(lowerQuery) !== -1;
      });
    }

    return filtered;
  }.property(
    'model', 'queryText',
    'showOnlyNonCheckedIn', 'showOnlyThoseWhoOweMoney'),

  percentCheckedIn: function () {
    var checkedIn = this.get('numberCheckedIn');
    /* var checkedOut = this.get('numberCheckedOut'); */
    var total = this.get('model').get('length');
    var percent = checkedIn / total * 100;

    return Math.round(percent, 2);
  }.property('model.[].isCheckedIn'),

  numberCheckedIn: function () {
    var model = this.get('model');
    return model.filterBy('isCheckedIn').get('length');
  }.property('model.[].isCheckedIn'),

  numberNotCheckedIn: function () {
    var model = this.get('model');
    return model.filterBy('isCheckedIn', false).get('length');
  }.property('model.[].isCheckedIn'),

  actions: {

    setActiveRegistrant: function (attendance) {
      this.set('activeRegistrant', attendance);
    },
  },

});
