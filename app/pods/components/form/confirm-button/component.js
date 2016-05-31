import Ember from 'ember';

export default Ember.Component.extend({
  preConfirmClasses: '', // set by caller
  target: null, // set by caller
  hasYetToConfirm: true,

  actions: {
    preClickAction() {
      this.set('hasYetToConfirm', false);
    },

    triggerAction() {
      this.sendAction('action', this.get('target'));
    }
  }
});
