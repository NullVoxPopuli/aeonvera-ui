import Ember from 'ember';
import DS from 'ember-data';
import computed, { readOnly } from 'ember-computed-decorators';

import { userIsMemberOf } from 'aeonvera/helpers/user/is-member-of';
import { userLatestRenewalFor } from 'aeonvera/helpers/user/latest-renewal-for';

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

  @readOnly
  @computed('firstName', 'lastName')
  name(first, last) {
    return `${first} ${last}`;
  },

  isMemberOf(organization) {
    return userIsMemberOf({}, { user: this, organization });
  },

  latestRenewalFor(organization) {
    return userLatestRenewalFor({}, { user: this, organization });
  }

});
