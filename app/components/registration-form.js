import Ember from 'ember';

export default Ember.Component.extend({
  title: Ember.computed('event.name', function() {
    return 'Register for ' + this.get('event.name');
  }).readOnly(),

  attendance: function() {
    return this.store.createRecord('event-attendance');
  }.property()

});
