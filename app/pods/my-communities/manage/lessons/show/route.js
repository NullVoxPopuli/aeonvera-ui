import Ember from 'ember';
import Show from 'aeonvera/mixins/routes/crud/events/show';

export default Ember.Route.extend(Show, {
  modelName: 'lesson',
  parentIdName: 'organization_id',
  parentPath: 'my-communities.manage',
});
