import Ember from 'ember';
import Form from 'aeonvera/mixins/components/edit-form';

export default Ember.Component.extend(Form, {
  modelName: 'level',
  saveSuccessPath: 'events.show.levels.show', // should be show?
  cancelPath: 'events.show.levels.show',
  parentAssociation: 'event',
  parentId: 'event_id',
});
