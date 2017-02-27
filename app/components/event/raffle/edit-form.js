import Ember from 'ember';
import Form from 'aeonvera/mixins/components/edit-form';

export default Ember.Component.extend(Form, {
  modelName: 'raffle',
  saveSuccessPath: 'events.show.raffles.show',
  cancelPath: 'events.show.raffles.show',
  parentAssociation: 'event'

  // parentId: 'event_id',
});
