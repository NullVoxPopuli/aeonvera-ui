import Component from '@ember/component';
import Form from 'aeonvera/mixins/components/edit-form';

export default Component.extend(Form, {
  hostId: null,
  hostType: null,
  modelName: 'lesson',
  saveSuccessPath: 'my-communities.manage.lessons.show',
  cancelPath: 'my-communities.manage.lessons.show',
  parentAssociation: 'host',

  actions: {
    changedMembershipDiscount() {
      this.get('model').send('becomeDirty');
    }
  }
});
