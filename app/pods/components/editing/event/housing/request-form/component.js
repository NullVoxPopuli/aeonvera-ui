import { equal } from '@ember/object/computed';
import Component from '@ember/component';
import Form from 'aeonvera/mixins/components/edit-form';
import ENV from 'aeonvera/config/environment';

export default Component.extend(Form, {
  modelName: 'housing-request',
  saveSuccessPath: 'events.show.housing.requests',
  cancelPath: 'events.show.housing.requests',
  parentAssociation: 'host',

  // set by form, not persisted
  // - 0: A Registrant
  // - 1: Entered Name
  whoIsRequestingType: 0,

  isRegistrantRequesting: equal('whoIsRequestingType', 0)
});
