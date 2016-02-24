import Ember from 'ember';

export default Ember.Component.extend({

  attendances: function () {
    return this.get('model');
  }.property('model'),

  attendancesPresent: function () {
    return true;
  }.property('model'),
});
