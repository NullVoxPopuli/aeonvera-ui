import Ember from 'ember';

export default Ember.Component.extend({
  // required to be passed in
  request: null,
  provisions: null,

  // managed by this component
  isEditing: false,

  host: Ember.computed('request.host', {
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
