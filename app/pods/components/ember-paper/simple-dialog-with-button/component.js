import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',
  raised: true,

  actions: {
    closeModal() {
      this.set('showModal', false);
    }
  }
});
