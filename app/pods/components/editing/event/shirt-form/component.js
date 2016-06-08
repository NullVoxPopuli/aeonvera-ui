import Ember from 'ember';
import Form from 'aeonvera/mixins/components/edit-form';

export default Ember.Component.extend(Form, {
  modelName: 'shirt',
  saveSuccessPath: 'events.show.shirts.show',
  cancelPath: 'events.show.shirts',
  parentAssociation: 'host',
});
