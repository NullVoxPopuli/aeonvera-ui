import Ember from 'ember';
import Form from 'aeonvera/mixins/components/edit-form';

export default Ember.Component.extend(Form, {
  modelName: 'lesson',
  saveSuccessPath: 'my-communities.manage.lessons.show', // should be show?
  cancelPath: 'my-communities.manage.lessons.show',
  parentAssociation: 'organization',
  parentId: 'organization_id',
});
