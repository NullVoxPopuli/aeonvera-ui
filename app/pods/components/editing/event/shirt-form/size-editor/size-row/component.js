import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',

  sizeData: {},
  isEditing: false,

  actions: {
    toggleEditing() {
      const isEditing = !this.get('isEditing');

      this.set('isEditing', isEditing);
    },

    cancel() {
      this.set('isEditing', false);
    },

    done() {
      this.set('isEditing', false);
      this.sendAction('onChange');
    }
  }
});
