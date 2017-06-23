import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',

  actions: {
    closeModal() {
      this.set('showModal', false);
    }
  }
});
