import Ember from 'ember';

export default Ember.Mixin.create({
  parentIdKey: 'event_id',
  parentPathRoot: 'events.show',
  include: '',
  q: {},

  model: function () {
    let modelName = this.get('modelName');
    let parentPathRoot = this.get('parentPathRoot');
    let parent = this.modelFor(parentPathRoot);
    let query = {};
    let key = this.get('parentIdKey');
    let include = this.get('include');

    query[key] = parent.get('id');

    if (Ember.isPresent(include)) {
      query.include = include;
    }

    let search = this.get('q');
    if (Ember.isPresent(search)) {
      query.q = search;
    }

    return this.store.query(modelName, query);
  },
});
