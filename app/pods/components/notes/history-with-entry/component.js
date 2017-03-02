import Ember from 'ember';
import { task } from 'ember-concurrency';

const { isPresent, isBlank } = Ember;

export default Ember.Component.extend({
  host: null,
  target: null,
  notes: [],

  didInsertElement() {
    this._super(...arguments);
    this.get('fetchNotesIfnotPresentTask').perform();
  },

  actions: {
    appendToNotes(note) {
      const notes = this.get('notes');
      const result = Ember.A();

      if (isPresent(notes)) {
        result.addObjects(notes);
      }

      if (isPresent(note)) {
        result.addObject(note);
        this.set('notes', result);
      }
    }
  },

  fetchNotesIfnotPresentTask: task(function * () {
    const notes = yield this.get('notes');

    if (isBlank(notes)) {
      this.get('notesTask').perform();
    }
  }),

  notesTask: task(function * () {
    const host = yield this.get('host');
    const target = yield this.get('target');

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
