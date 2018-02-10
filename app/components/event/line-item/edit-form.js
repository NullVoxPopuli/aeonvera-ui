import Component from '@ember/component';
import Form from 'aeonvera/mixins/components/edit-form';

export default Component.extend(Form, {
  modelName: 'a-la-carte-item',
  saveSuccessPath: 'events.show.line-items.show', // should be show?
  cancelPath: 'events.show.line-items.show',
  parentAssociation: 'host'

});
