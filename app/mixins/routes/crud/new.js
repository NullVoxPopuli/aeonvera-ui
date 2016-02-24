import Ember from 'ember';

export default Ember.Mixin.create({
  model: function (params) {
    let modelName = this.get('modelName');
    let modelParams = {};
    return this.store.createRecord(modelName, modelParams);
  },
});
