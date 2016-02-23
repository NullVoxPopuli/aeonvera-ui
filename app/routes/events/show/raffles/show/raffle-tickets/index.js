import Ember from 'ember';
import Index from 'aeonvera/mixins/routes/crud/events/index';

export default Ember.Route.extend(Index, {
  modelName: 'raffle-ticket',
  parentIdKey: 'raffle_id',
  parentPathRoot: 'events.show.raffles.show'
});
