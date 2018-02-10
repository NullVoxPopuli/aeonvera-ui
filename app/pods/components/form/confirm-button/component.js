import Component from '@ember/component';

export default Component.extend({
  preConfirmClasses: '', // set by caller
  cancelClasses: '',
  confirmClasses: 'no-margins tiny',
  target: null, // set by caller
  confirmText: 'Confirm',
  showCancel: false,
  hasYetToConfirm: true,
  confirmDestructive: false,
  confirmPrimary: false,

  actions: {
    preClickAction() {
      this.set('hasYetToConfirm', false);
    },

    triggerAction() {
      this.sendAction('action', this.get('target'));
    },

    cancel() {
      this.set('hasYetToConfirm', true);
    }
  }
});
