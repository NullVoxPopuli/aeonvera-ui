import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',

  deleteLabel: Ember.computed('model', function() {
    return 'Delete this ' + this.get('model.klass');
  }),

  actions: {
    destroy: function() {
      this.get('model').destroyRecord().then(() => {}, failure => {

        this.get('flashMessages').alert(
          'Deleting failed. ' + failure
        );
      });
    },

    undestroy: function() {
      const model = this.get('model');

      model.set('deletedAt', null);
      model.save().then(() => {}, failure => {

        this.get('flashMessages').alert(
          'Undeleting failed. ' + failure
        );
      });
    }
  }
});
