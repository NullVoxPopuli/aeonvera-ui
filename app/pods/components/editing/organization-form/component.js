import Component from '@ember/component';
import EditModel from 'aeonvera/mixins/edit-model';

export default Component.extend(EditModel, {
  modelName: 'organization',
  saveSuccessPath: 'my-communities.manage',
  cancelPath: 'my-communities.manage'
});
