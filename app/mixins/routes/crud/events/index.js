import Ember from 'ember';

export default Ember.Mixin.create({
  model: function() {
    let modelName = this.get('modelName');
    let event = this.modelFor('events.show');
    return this.store.query(modelName, {
      event_id: event.get('id')
    });
  }
});
