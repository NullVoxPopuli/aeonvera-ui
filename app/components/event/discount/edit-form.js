import Ember from 'ember';
import Form from 'aeonvera/mixins/components/edit-form';

export default Ember.Component.extend(Form, {
  modelName: 'discount',
  saveSuccessPath: 'events.show.discounts', // should be show?
  cancelPath: 'events.show.discounts',
  parentAssociation: 'event',
  parentId: 'event_id'
});
