import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  email: DS.attr('string'),
  password: DS.attr('string'),
  passwordConfirmation: DS.attr('string'),
  currentPassword: DS.attr('string'),
  unconfirmedEmail: DS.attr('string'),
  timeZone: DS.attr('string'),

  membershipRenewals: DS.hasMany('membership-renewal'),

  name: Ember.computed('firstName', 'lastName', function() {
    return this.get('firstName') + ' ' + this.get('lastName');
  }).readOnly(),

  isMemberOf(organization) {
    let isMember = false;
    let membershipRenewals = this.get('membershipRenewals');

    membershipRenewals.forEach((item, i, e) => {
      let related = item.get('membershipOption.host');

      if (related.get('id') === organization.get('id') &&
        related.get('domain') === organization.get('domain')
      ) {
        // TODO: yield here or whatever it's called.
        // just need to be able to pass a block
        isMember = true;
      }
    });

    return isMember;
  },

  latestRenewalFor(organization) {
    let membershipRenewals = this.get('membershipRenewals');
    let renewalsMatchingOrganization = [];

    membershipRenewals.forEach((item, i, e) => {
      let related = item.get('membershipOption.host');
      let match = (related.get('id') === organization.get('id') &&
        related.get('domain') === organization.get('domain'));

      if (match) renewalsMatchingOrganization.push(item);
    });

    let latestDate = null;
    let latestRenewal = null;
    renewalsMatchingOrganization.forEach((item) => {
      let expiresAt = item.get('expiresAt');
      if (latestDate == null || latestDate < expiresAt) {
        latestRenewal = item;
        latestDate = expiresAt;
      }
    });

    return latestRenewal;
  },

});
