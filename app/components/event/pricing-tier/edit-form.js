import Component from '@ember/component';
import Form from 'aeonvera/mixins/components/edit-form';

export default Component.extend(Form, {
  modelName: 'pricing-tier',
  saveSuccessPath: 'events.show.pricing-tiers.show',
  cancelPath: 'events.show.pricing-tiers',
  /* used for creating / navigating */
  parentAssociation: 'event',
  parentId: 'event_id'

});
