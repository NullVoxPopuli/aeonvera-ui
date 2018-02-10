import Component from '@ember/component';
import Form from 'aeonvera/mixins/components/edit-form';

export default Component.extend(Form, {
  modelName: 'competition',
  saveSuccessPath: 'events.show.competitions.show', // should be show?
  cancelPath: 'events.show.competitions',
  parentAssociation: 'event'
});
