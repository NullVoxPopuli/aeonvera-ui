import DS from 'ember-data';

import {  get } from '@ember/object';
import { computed } from 'ember-decorators/object';
import { hasMany, attr } from 'ember-decorators/data';

// const { hasMany, attr } = DS;

import { userIsMemberOf } from 'aeonvera/helpers/user/is-member-of';
import { userLatestRenewalFor } from 'aeonvera/helpers/user/latest-renewal-for';

// export default class User extends DS.Model {
//   @attr('string') firstName;
//   @attr('string') lastName;
//   @attr('string') email;
//   @attr('string') password;
//   @attr('string') passwordConfirmation;
//   @attr('string') currentPassword;
//   @attr('string') unconfirmedEmail;
//   @attr('string') timeZone;
//
//   @hasMany('membership-renewal') membershipRenewals;
//
//   @computed('firstName', 'lastName')
//   get name() {
//     return `${this.firstName} ${this.lastName}`;
//   };
//
//   isMemberOf(organization) {
//     return userIsMemberOf({}, { user: this, organization });
//   }
//
//   latestRenewalFor(organization) {
//     return userLatestRenewalFor({}, { user: this, organization });
//   }
// }

export default class User extends DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  email: DS.attr('string'),
  password: DS.attr('string'),
  passwordConfirmation: DS.attr('string'),
  currentPassword: DS.attr('string'),
  unconfirmedEmail: DS.attr('string'),
  timeZone: DS.attr('string'),

  membershipRenewals: DS.hasMany('membership-renewal'),
}) {
  @computed('firstName', 'lastName')
  get name(this: User): string {
    return `${get(this, 'firstName')} ${get(this, 'lastName')}`;
  }

  isMemberOf(organization) {
    return userIsMemberOf({}, { user: this, organization });
  }

  latestRenewalFor(organization) {
    return userLatestRenewalFor({}, { user: this, organization });
  }
};

declare module 'ember-data' {
  interface ModelRegistry {
    person: User;
  }
};
