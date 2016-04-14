import Ember from 'ember';
import Form from 'aeonvera/mixins/components/edit-form';

export default Ember.Component.extend(Form, {
  modelName: 'a-la-carte-item',
  saveSuccessPath: 'events.show.line-items.show', // should be show?
  cancelPath: 'events.show.line-items.show',
  parentAssociation: 'host',

});
