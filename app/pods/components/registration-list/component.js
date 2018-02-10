import Component from '@ember/component';

export default Component.extend({

  registrations: function() {
    return this.get('model');
  }.property('model'),

  registrationsPresent: function() {
    return true;
  }.property('model')
});
