import Ember from 'ember';

export default Ember.Route.extend({
  idName: 'raffle_ticket_id',
  modelName: 'raffle-ticket',

  model: function(params) {
    let raffle = this.modelFor('events.show.raffles.show');
    let idName = this.get('idName');
    let modelName = this.get('modelName');

    let record = this.store.findRecord(modelName, params[idName], {
      adapterOptions: {
        query: {
          raffle_id: raffle.get('id'),
          include: 'attendances'
        }
      }
    });

    return record;
  }
});
