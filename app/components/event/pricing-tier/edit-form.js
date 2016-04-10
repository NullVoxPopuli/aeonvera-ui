import Ember from 'ember';
import Form from 'aeonvera/mixins/components/edit-form';

export default Ember.Component.extend(Form, {
  modelName: 'pricing-tier',
  saveSuccessPath: 'events.show.pricing-tiers.show',
  cancelPath: 'events.show.pricing-tiers.show',
  /* used for creating / navigating */
  parentAssociation: 'event',
  parentId: 'event_id',

});
