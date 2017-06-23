import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    openLoginModal() {
      Ember.$('.auth-link .login').click();
    },

    openSignupModal() {
      Ember.$('.auth-link .signup').click();
    }
  }
});
