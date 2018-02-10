import Component from '@ember/component';
import Form from 'aeonvera/mixins/components/edit-form';

export default Component.extend(Form, {
  modelName: 'level',
  saveSuccessPath: 'events.show.levels.show', // should be show?
  cancelPath: 'events.show.levels',
  parentAssociation: 'event',
  parentId: 'event_id'
});
