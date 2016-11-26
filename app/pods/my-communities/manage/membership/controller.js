import Ember from 'ember';
import ENV from 'aeonvera/config/environment';

export default Ember.Controller.extend({
  paramsForDownload: Ember.computed('organizationId', {
    get() {
      return {
        organization_id: this.get('organizationId')
      };
    }
  }),

  path: Ember.computed('organizationId', {
    get() {
      return `${ENV.host}/api/members.csv?`;
    }
  }),

  fieldsForCSV: [
    { name: 'firstName', included: true },
    { name: 'lastName', included: true },
    { name: 'email', included: true },
    { name: 'isActiveMember', included: true },
    { name: 'memberSince', included: true },
    { name: 'membershipExpiresAt', included: true },
  ]
});
