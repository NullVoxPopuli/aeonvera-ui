import Ember from 'ember';

export default Ember.Mixin.create({
  parentPathRoot: 'events.show',
  useParentOfType: null,

  model: function(params) {
    const modelName = this.get('modelName');
    const parentPathRoot = this.get('parentPathRoot');
    const parent = this.modelFor(parentPathRoot);

    const isPolymorphicHost = this.get('isPolymorphicHost');

    // might need to do something for non event hosts?
    // idk how generic I want to get with this
    const key = Ember.isPresent(isPolymorphicHost) ? 'host' : 'event';
    const modelParams = {};

    const useParentOfType = this.get('useParentOfType');

    if (Ember.isPresent(useParentOfType)) {
      const parentId = parent.get('id');
      const promise = this.store.findRecord(useParentOfType, parentId).then(parent => {
        modelParams[key] = parent;
        const recordPromise = this.store.createRecord(modelName, modelParams);

        return recordPromise;
      });

      return promise;
    }

    modelParams[key] = parent;
    const recordPromise = this.store.createRecord(modelName, modelParams);

    return recordPromise;
  }
});
