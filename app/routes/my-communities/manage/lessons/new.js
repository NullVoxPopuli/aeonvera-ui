import Ember from 'ember';
import New from 'aeonvera/mixins/routes/crud/events/new';

export default Ember.Route.extend(New, {
  modelName: 'lesson',
  parentPathRoot: 'my-communities.manage',
  isPolymorphicHost: true,
});
