import Route from '@ember/routing/route';
import Index from 'aeonvera/mixins/routes/crud/events/index';

export default Route.extend(Index, {
  modelName: 'dance',
  parentIdKey: 'organization_id',
  parentPathRoot: 'my-communities.manage'
});
