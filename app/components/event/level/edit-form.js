import Ember from 'ember';
import Form from 'aeonvera/mixins/components/edit-form';

export default Ember.Component.extend(Form, {
  modelName: 'level',
  saveSuccessPath: 'events.show.levels.show',
  cancelPath: 'events.show.levels'
});
