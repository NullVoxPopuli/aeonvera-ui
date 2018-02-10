import Component from '@ember/component';
import Form from 'aeonvera/mixins/components/edit-form';

export default Component.extend(Form, {
  modelName: 'discount',
  saveSuccessPath: 'events.show.discounts.show', // should be show?
  cancelPath: 'events.show.discounts',
  parentAssociation: 'host'
});
