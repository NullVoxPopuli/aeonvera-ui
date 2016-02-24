import Ember from 'ember';
import ShowEdit from 'aeonvera/mixins/routes/crud/events/show/edit';

export default Ember.Route.extend(ShowEdit, {
  modelName: 'custom-field',
});
