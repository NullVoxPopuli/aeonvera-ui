import Ember from 'ember';
import Form from 'aeonvera/mixins/components/edit-form';
import ENV from 'aeonvera/config/environment';

export default Ember.Component.extend(Form, {
  modelName: 'housing-request',
  saveSuccessPath: 'events.show.housing.requests',
  cancelPath: 'events.show.housing.requests',
  parentAssociation: 'host',

  // set by form, not persisted
  // - 0: A Registrant
  // - 1: Entered Name
  whoIsRequestingType: 0,

  isRegistrantRequesting: Ember.computed.equal('whoIsRequestingType', 0)
});
