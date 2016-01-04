import Ember from 'ember';

export default Ember.Mixin.create({
  model: function(params) {
    let modelName = this.get('modelName');
    let idName = modelName.underscore() + '_id';
    let event = this.modelFor('events.show');

    let record = this.store.findRecord(modelName, params[idName], {
      adapterOptions: {
        query: {
          event_id: event.get('id')
        }
      }
    });
    return record;
  }
});
