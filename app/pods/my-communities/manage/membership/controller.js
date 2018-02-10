import Controller from '@ember/controller';
import ENV from 'aeonvera/config/environment';

import { computed } from 'ember-decorators/object';
import { alias } from 'ember-decorators/object/computed';

export default Controller.extend({
  @alias('model.id') organizationId: null,

  @computed('organizationId')
  paramsForDownload(organizationId) {
    return {
      organization_id: organizationId
    };
  },

  @computed('organizationId')
  path(organizationId) {
    return `${ENV.host}/api/members.csv?`;
  },

  fieldsForCSV: [
    { name: 'firstName', included: true },
    { name: 'lastName', included: true },
    { name: 'email', included: true },
    { name: 'isActiveMember', included: true },
    { name: 'memberSince', included: true },
    { name: 'membershipExpiresAt', included: true }
  ]
});
