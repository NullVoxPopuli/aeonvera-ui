import Ember from 'ember';

export default Ember.Component.extend({
  registrations: function() {
    return this.get('model');
  }.property('model'),

  registrationsPresent: function() {
    return true;
  }.property('model')
});
