import Ember from 'ember';
import Form from 'aeonvera/mixins/components/edit-form';
import ENV from 'aeonvera/config/environment';

export default Ember.Component.extend(Form, {
  modelName: 'housing-provision',
  saveSuccessPath: 'events.show.housing.provisions',
  cancelPath: 'events.show.housing.provisions',
  parentAssociation: 'host',

  // set by form, not persisted
  // - 0: A Registrant
  // - 1: Entered Name
  whoIsProvidingType: 0,

  isRegistrantProviding: Ember.computed.equal('whoIsProvidingType', 0)
});
