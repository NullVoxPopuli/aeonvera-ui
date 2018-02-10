import Mixin from '@ember/object/mixin';

export default Mixin.create({
  model: function(params) {
    const modelName = this.get('modelName');
    const modelParams = {};

    return this.store.createRecord(modelName, modelParams);
  }
});
