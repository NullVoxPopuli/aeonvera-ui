import Component from '@ember/component';
export default Component.extend({
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
