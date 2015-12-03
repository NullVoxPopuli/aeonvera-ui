import Ember from 'ember';

export default Ember.Mixin.create({
  model: function(params) {
    let modelName = this.get('modelName');
    let event = this.modelFor('events.show');
    return this.store.createRecord(modelName, {
      event: event
    });
  }
});
