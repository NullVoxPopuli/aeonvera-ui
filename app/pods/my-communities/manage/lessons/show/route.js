import Route from '@ember/routing/route';
import Show from 'aeonvera/mixins/routes/crud/events/show';

export default Route.extend(Show, {
  modelName: 'lesson',
  parentIdName: 'organization_id',
  parentPath: 'my-communities.manage'
});
