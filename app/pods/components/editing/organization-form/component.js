import Ember from 'ember';
import EditModel from 'aeonvera/mixins/edit-model';

export default Ember.Component.extend(EditModel, {
  modelName: 'organization',
  saveSuccessPath: 'my-communities.manage',
  cancelPath: 'my-communities.manage',
});
