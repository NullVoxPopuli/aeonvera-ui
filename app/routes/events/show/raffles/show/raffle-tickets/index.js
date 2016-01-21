import Ember from 'ember';

export default Ember.Mixin.create({
  modelName: 'raffle-ticket',
  model: function() {
    let modelName = this.get('modelName');
    let raffle = this.modelFor('events.show.raffles.show');
    return this.store.query(modelName, {
      raffle_id: raffle.get('id')
    });
  }
});
