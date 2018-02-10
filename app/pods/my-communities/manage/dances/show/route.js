import Route from '@ember/routing/route';
import Show from 'aeonvera/mixins/routes/crud/events/show';

export default Route.extend(Show, {
  modelName: 'dance',
  parentIdKey: 'organization_id',
  parentPathRoot: 'my-communities.manage'
});
