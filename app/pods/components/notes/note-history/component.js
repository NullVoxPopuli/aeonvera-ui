import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Component.extend({
  target: null,
  host: null,

  didReceiveAttrs() {
    this._super(...arguments);

    this.get('notesTask').perform();
  },

  notesTask: task(function * () {
    const host = this.get('host');
    const target = this.get('target');

    const notes = yield this.store.query('note', {
      host_id: host.get('id'),
      host_type: host.get('klass'),
      q: {
        target_id_eq: target.get('id'),
        target_type_eq: target.get('klass')
      }
    });

    this.set('notes', notes);
  })
});
