import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  tagName: 'span',

  deleteLabel: computed('model', function() {
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
