import Ember from 'ember';

export default Ember.Component.extend({

  attendance: function () {
      return this.store.createRecord('event-attendance');
    }.property(),
});
