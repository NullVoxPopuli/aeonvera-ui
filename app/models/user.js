import Ember from 'ember';
import DS from 'ember-data';

import { computed, readOnly } from 'ember-decorators/object';
import { hasMany, attr } from 'ember-decorators/data';

import { userIsMemberOf } from 'aeonvera/helpers/user/is-member-of';
import { userLatestRenewalFor } from 'aeonvera/helpers/user/latest-renewal-for';
//
// export default class User extends DS.Model {
//   @attr('string') firstName
//   @attr('string') lastName
//   @attr('string') email
//   @attr('string') password
//   @attr('string') passwordConfirmation
//   @attr('string') currentPassword
//   @attr('string') unconfirmedEmail
//   @attr('string') timeZone
//
//   @hasMany('membership-renewal') membershipRenewals
//
//   @readOnly
//   @computed('firstName', 'lastName')
//   name(first, last) {
//     return `${first} ${last}`;
//   }
//
//   isMemberOf(organization) {
//     return userIsMemberOf({}, { user: this, organization });
//   }
//
//   latestRenewalFor(organization) {
//     return userLatestRenewalFor({}, { user: this, organization });
//   }
// }

export default DS.Model.extend({
  @attr('string') firstName: null,
  @attr('string') lastName: null,
  @attr('string') email: null,
  @attr('string') password: null,
  @attr('string') passwordConfirmation: null,
  @attr('string') currentPassword: null,
  @attr('string') unconfirmedEmail: null,
  @attr('string') timeZone: null,

  @hasMany('membership-renewal') membershipRenewals: null,

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
