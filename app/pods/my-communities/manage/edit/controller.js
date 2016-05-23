import Ember from 'ember';
import Form from 'aeonvera/mixins/edit-model';

export default Ember.Controller.extend(Form, {
  modelName: 'organization',
  saveSuccessPath: 'my-communities.manage',
  cancelPath: 'my-communities.manage',

  action: {
    logoChanged(e) {
      this.get('model.logo').update(e.target.files[0]);
    }
  }
});
