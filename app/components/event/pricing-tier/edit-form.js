import Ember from 'ember';
import Form from 'aeonvera/mixins/components/edit-form';

export default Ember.Component.extend(Form, {
  modelName: 'pricing-tier',
  saveSuccessPath: 'events.show.pricing-tiers', // should be show?
  cancelPath: 'events.show.pricing-tiers'

});
