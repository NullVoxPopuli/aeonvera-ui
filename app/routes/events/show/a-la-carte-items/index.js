import Ember from 'ember';
import Index from 'aeonvera/mixins/routes/crud/events/index';

export default Ember.Route.extend(Index, {
  modelName: 'line-item',
});
