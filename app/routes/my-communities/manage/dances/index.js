import Ember from 'ember';
import Index from 'aeonvera/mixins/routes/crud/events/index';

export default Ember.Route.extend(Index, {
  modelName: 'dance',
  parentIdKey: 'organization_id',
  parentPathRoot: 'my-communities.manage',
});
