import Ember from 'ember';
import ShowIndex from 'aeonvera/mixins/routes/crud/events/show/edit';

export default Ember.Mixin.create(ShowEdit, {
  modelName: 'raffle-ticket',
  parentPathRoot: 'events.show.raffles.show',
});
