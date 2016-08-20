import Ember from 'ember';

export default Ember.Mixin.create({
  parentPath: 'events.show',
  parentIdName: 'event_id',
  include: '',

  model: function (params, transition) {
    let modelName = this.get('modelName');
    let idName = modelName.underscore() + '_id';
    let parentPath = this.get('parentPath');
    let parent = this.modelFor(parentPath);
    let query = {};
    let parentIdName = this.get('parentIdName');
    let include = this.get('include');
    query[parentIdName] = parent.get('id');

    if (Ember.isPresent(include)) {
      query.include = include;
    }

    let record = this.store.findRecord(modelName, params[idName], query);
    return record;
  },
});
