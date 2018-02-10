import Component from '@ember/component';

export default Component.extend({
  host: null,
  target: null,
  text: '',

  actions: {
    createRecord(callback) {
      const promise = this.store.createRecord('note', {
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
  }

});
