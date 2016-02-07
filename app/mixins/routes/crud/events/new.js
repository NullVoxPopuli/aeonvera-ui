import Ember from 'ember';

export default Ember.Mixin.create({
  parentPathRoot: 'events.show',

  model: function(params) {
    let modelName = this.get('modelName');
    let parentPathRoot = this.get('parentPathRoot');
    let parent = this.modelFor(parentPathRoot);

    let isPolymorphicHost = this.get('isPolymorphicHost');
    // might need to do something for non event hosts?
    // idk how generic I want to get with this
    let key = Ember.isPresent(isPolymorphicHost) ? 'host' : 'event';
    let modelParams = {};
    modelParams[key] = parent;

    let recordPromise = this.store.createRecord(modelName, modelParams);

    return recordPromise;
  }
});
