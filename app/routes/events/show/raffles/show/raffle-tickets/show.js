import Route from '@ember/routing/route';

export default Route.extend({
  idName: 'raffle_ticket_id',
  modelName: 'raffle-ticket',

  model: function(params) {
    const raffle = this.modelFor('events.show.raffles.show');
    const idName = this.get('idName');
    const modelName = this.get('modelName');

    const record = this.store.findRecord(modelName, params[idName], {
      adapterOptions: {
        query: {
          raffle_id: raffle.get('id'),
          include: 'registrations'
        }
      }
    });

    return record;
  }
});
