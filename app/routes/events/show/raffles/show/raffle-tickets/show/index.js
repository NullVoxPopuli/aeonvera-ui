import Ember from 'ember';
import ShowIndex from 'aeonvera/mixins/routes/crud/events/show/index';

export default Ember.Mixin.create(ShowIndex, {
  modelName: 'raffle-ticket',
  parentPathRoot: 'events.show.raffles.show'
});
