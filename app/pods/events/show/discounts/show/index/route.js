import Route from '@ember/routing/route';
import ShowIndex from 'aeonvera/mixins/routes/crud/events/show/index';

export default Route.extend(ShowIndex, {
  modelName: 'discount'
});
