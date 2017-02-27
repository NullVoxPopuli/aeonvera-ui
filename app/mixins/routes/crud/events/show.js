import Ember from 'ember';

export default Ember.Mixin.create({
  parentPath: 'events.show',
  parentIdName: 'event_id',
  include: '',

  model: function(params, transition) {
    const modelName = this.get('modelName');
    const idName = modelName.underscore() + '_id';
    const parentPath = this.get('parentPath');
    const parent = this.modelFor(parentPath);
    const query = {};
    const parentIdName = this.get('parentIdName');
    const include = this.get('include');

    query[parentIdName] = parent.get('id');

    if (Ember.isPresent(include)) {
      query.include = include;
    }

    const record = this.store.findRecord(modelName, params[idName], query);

    return record;
  }
});
