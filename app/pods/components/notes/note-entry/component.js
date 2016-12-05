import Ember from 'ember';

export default Ember.Component.extend({
  host: null,
  target: null,
  text: '',

  actions: {
    createRecord() {
      this.store.createRecord('note', {
        host: this.get('host'),
        target: this.get('target'),
        note: this.get('text')
      }).save().then(note => {
        this.set('text', '');
        // call action to update
      });
    }
  },

});
