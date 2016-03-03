import Ember from 'ember';

export default Ember.Component.extend({
  initFoundation: function() {
    this.$(document).foundation('reflow');
  }.on('didInsertElement'),

  errors: function() {
    return this.get('model').get('errors');
  }.property('model'),

  emailClass: function() {
    var errors = this.get('errors');
    if (errors.get('email') && errors.get('email').length > 0) {
      return 'error';
    }

    return errors.email;
  }.property('errors'),

  actions: {
    register: function() {
      this.sendAction('action');
    },
  },
});
