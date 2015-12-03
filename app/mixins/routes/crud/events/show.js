import Ember from 'ember';

export default Ember.Mixin.create({
  model: function(params) {
    let modelName = this.get('modelName');
    let idName = modelName + '_id';
    return this.store.findRecord(modelName, params[idName]);
  }
});
