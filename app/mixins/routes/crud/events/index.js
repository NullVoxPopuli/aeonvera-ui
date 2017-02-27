import Ember from 'ember';

export default Ember.Mixin.create({
  parentIdKey: 'event_id',
  parentPathRoot: 'events.show',
  include: '',
  q: {},

  model: function() {
    const modelName = this.get('modelName');
    const parentPathRoot = this.get('parentPathRoot');
    const parent = this.modelFor(parentPathRoot);
    const query = {};
    const key = this.get('parentIdKey');
    const include = this.get('include');

    query[key] = parent.get('id');

    if (Ember.isPresent(include)) {
      query.include = include;
    }

    const search = this.get('q');

    if (Ember.isPresent(search)) {
      query.q = search;
    }

    return this.store.query(modelName, query);
  }
});
