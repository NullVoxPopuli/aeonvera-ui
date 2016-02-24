import Ember from 'ember';
import Form from 'aeonvera/mixins/components/edit-form';

export default Ember.Component.extend(Form, {
  modelName: 'package',
  saveSuccessPath: 'events.show.packages', // should be show?
  cancelPath: 'events.show.packages',
});
