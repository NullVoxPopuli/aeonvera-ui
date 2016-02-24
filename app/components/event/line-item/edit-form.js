import Ember from 'ember';
import Form from 'aeonvera/mixins/components/edit-form';

export default Ember.Component.extend(Form, {
  modelName: 'a-la-carte-item',
  saveSuccessPath: 'events.show.a-la-carte-items', // should be show?
  cancelPath: 'events.show.a-la-carte-items',
});
