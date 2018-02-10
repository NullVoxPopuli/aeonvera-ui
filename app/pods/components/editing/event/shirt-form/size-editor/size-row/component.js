import Component from '@ember/component';

export default Component.extend({
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
