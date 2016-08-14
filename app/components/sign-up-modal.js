import Ember from 'ember';

export default Ember.Component.extend({
  pathStore: Ember.inject.service(),
  store: Ember.inject.service(),
  model: null,

  initFoundation: function() {
    this.$(document).foundation('reflow');
  }.on('didInsertElement'),

  init() {
    this._super(...arguments);
    let user = this.get('store').createRecord('user');
    this.set('model', user);
  },

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
    // callback required for async button
    register(callback) {
      this.get('pathStore').storeCurrentRoute();

      let promise = this.get('model').save().then(user => {
        this.sendAction('successAction');
        user.unloadRecord();
      });

      callback(promise);
    },
  },
});
