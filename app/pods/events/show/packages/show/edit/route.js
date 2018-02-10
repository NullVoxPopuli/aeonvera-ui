import Route from '@ember/routing/route';
import ShowEdit from 'aeonvera/mixins/routes/crud/events/show/edit';

export default Route.extend(ShowEdit, {
  modelName: 'package'
});
