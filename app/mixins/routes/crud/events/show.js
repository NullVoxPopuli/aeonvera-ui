import Ember from 'ember';

export default Ember.Mixin.create({
  model: function(params) {
    console.log('the show route');
    console.log(params);
    let modelName = this.get('modelName');
    let idName = modelName.underscore() + '_id';
    let record = this.store.findRecord(modelName, params[idName]);
    console.log(record);
    this.set('currentModel', record);
    return record;
  }
});
