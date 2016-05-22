import Ember from 'ember';
import Form from 'aeonvera/mixins/components/edit-form';

export default Ember.Component.extend(Form, {
  modelName: 'competition',
  saveSuccessPath: 'events.show.competitions.show', // should be show?
  cancelPath: 'events.show.competitions.show',
  parentAssociation: 'event',
});
