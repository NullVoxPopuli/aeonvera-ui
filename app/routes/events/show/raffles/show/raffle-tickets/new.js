import Route from '@ember/routing/route';

export default Route.extend({
  modelName: 'raffle-ticket',

  model: function(params) {
    const modelName = this.get('modelName');
    const raffle = this.modelFor('events.show.raffles.show');

    const parentKey = 'raffle';
    const modelParams = {};

    modelParams[parentKey] = raffle;

    const recordPromise = this.store.createRecord(modelName, modelParams);

    return recordPromise;
  }
});
