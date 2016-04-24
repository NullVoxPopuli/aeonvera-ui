import Ember from 'ember';
import Form from 'aeonvera/mixins/components/edit-form';

export default Ember.Component.extend(Form, {
  modelName: 'custom-field',
  saveSuccessPath: 'events.show.custom-fields.show', // should be show?
  cancelPath: 'events.show.custom-fields.show',
  parentAssociation: 'event',
});
