import Ember from 'ember';
import ShowIndex from 'aeonvera/mixins/routes/crud/events/show/index';

export default Ember.Route.extend(ShowIndex, {
  modelName: 'discount'
});
