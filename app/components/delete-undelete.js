import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  actions: {
    destroy: function() {
      this.get('model').destroyRecord().then((m) => {}, failure => {
        this.get('flashMessages').alert(
          'Saving failed. ' + failure
        );
      });;
    },
    undestroy: function() {
      let model = this.get('model');
      model.set('deletedAt', null);
      model.save().then((m) => {}, failure => {
        this.get('flashMessages').alert(
          'Saving failed. ' + failure
        );
      });;
    }
  }
});
