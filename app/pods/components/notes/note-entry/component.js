import Ember from 'ember';

export default Ember.Component.extend({
  host: null,
  target: null,
  text: '',

  actions: {
    createRecord(callback) {
      let promise = this.store.createRecord('note', {
        host: this.get('host'),
        target: this.get('target'),
        note: this.get('text')
      }).save()
        .then(note => {
          this.set('text', '');
          this.sendAction('afterCreate', note);
        });

      callback(promise);
    }
  },

});
