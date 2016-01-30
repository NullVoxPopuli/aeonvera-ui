import Ember from 'ember';

export default Ember.Component.extend({
  isEditing: false,
  actions: {
    toggleEdit: function() {
      this.set('isEditing', !this.get('isEditing'));
    },

    save: function() {
      let model = this.get('model');

      model.save().then((record) => {
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
