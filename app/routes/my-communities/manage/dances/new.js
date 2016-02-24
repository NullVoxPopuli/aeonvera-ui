import Ember from 'ember';
import New from 'aeonvera/mixins/routes/crud/events/new';

export default Ember.Route.extend(New, {
  modelName: 'dance',
  parentPathRoot: 'my-communities.manage',
  isPolymorphicHost: true,
});
