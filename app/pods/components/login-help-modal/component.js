import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    passwordReset() {
      this.sendAction('passwordAction');
    },

    newConfirmation() {
      this.sendAction('confirmationAction');
    },

    newUnlock() {
      this.sendAction('unlockAction');
    }
  }
});
