import Ember from 'ember';

export default Ember.Route.extend({
  activate: function () {
    Ember.$('a.close-reveal-modal').trigger('click');
  },

  model: function () {
    return this.get('store').createRecord('user');
  },

  actions: {
    resetSuccess: function () {
      this.transitionTo('password-reset.success');
    },

    newPasswordSet: function(){
      this.transitionTo('dashboard');
    },
  },
});
