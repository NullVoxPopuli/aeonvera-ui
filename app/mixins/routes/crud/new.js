import Ember from 'ember';

export default Ember.Mixin.create({
  model: function(params) {
    const modelName = this.get('modelName');
    const modelParams = {};

    return this.store.createRecord(modelName, modelParams);
  }
});
