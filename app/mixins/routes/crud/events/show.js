import Ember from 'ember';

export default Ember.Mixin.create({
  parentPath: 'events.show',
  parentIdName: 'event_id',

  model: function(params) {
    let modelName = this.get('modelName');
    let idName = modelName.underscore() + '_id';
    let parentPath = this.get('parentPath');
    let parent = this.modelFor(parentPath);
    let query = {};
    let parentIdName = this.get('parentIdName');
    query[parentIdName] = parent.get('id');

    let record = this.store.findRecord(modelName, params[idName], {
      adapterOptions: {
        query: query
      }
    });
    return record;
  }
});
