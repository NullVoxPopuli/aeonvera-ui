import Ember from 'ember';
export default Ember.Component.extend({
  afterLogin: '',
  showLoginModal: false,
  buttonClasses: 'login',

  actions: {
    afterLogin() {
      this.set('showLoginModal', false);
      this.sendAction('afterLogin');
    },

    hideModal() {
      this.set('showLoginModal', false);
    },

    showModal() {
      this.set('showLoginModal', true);
    }
  }
});
