import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  // required to be passed in
  request: null,
  provisions: null,

  // managed by this component
  isEditing: false,

  host: computed('request.host', {
    get() {
      return this.get('request.host');
    }
  }),

  actions: {
    save() {
      this.get('request').save();
      this.set('isEditing', false);
    },

    cancel() {
      this.set('isEditing', false);
    },

    change() {
      this.set('isEditing', true);
    }
  }
});
