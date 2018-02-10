import Route from '@ember/routing/route';
import New from 'aeonvera/mixins/routes/crud/events/new';

export default Route.extend(New, {
  modelName: 'lesson',
  parentPathRoot: 'my-communities.manage',
  useParentOfType: 'organization',
  isPolymorphicHost: true
});
