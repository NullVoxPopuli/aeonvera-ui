import Component from '@ember/component';

export default Component.extend({
  isEditing: false,
  actions: {
    toggleEdit: function() {
      this.set('isEditing', !this.get('isEditing'));
    },

    save: function() {
      const model = this.get('model');

      model.save().then(record => {
        this.get('flashMessages').success(
          'Saved Successfully'
        );
        this.set('isEditing', !this.get('isEditing'));
      }, failure => {

        this.get('flashMessages').alert(
          'Saving failed. ' + failure
        );
      });
    }
  }
});
