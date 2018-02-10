import Component from '@ember/component';
import { isPresent } from '@ember/utils';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';
import DS from 'ember-data';

import { computed, readOnly } from 'ember-decorators/object';
import { alias } from 'ember-decorators/object/computed';

import { PropTypes } from 'ember-prop-types';

import { userLatestRenewalFor } from 'aeonvera/helpers/user/latest-renewal-for';

export default Component.extend({
  propTypes: {
    organization: PropTypes.EmberObject.isRequired,
    order: PropTypes.EmberObject.isRequired,
    token: PropTypes.any
  },

  session: service('session'),
  currentUser: service('current-user'),
  cart: service('order-cart'),

  @readOnly
  @computed('organization.{name}')
  title(name) {
    return `Register for ${name}`;
  },

  @alias('session.isAuthenticated') loggedIn: null,

  @computed('currentUser', 'organization', 'session.currentUser', 'session.isAuthenticated')
  isCurrentMember(currentUser, organization) {
    return DS.PromiseObject.create({
      promise: currentUser.get('isMemberOf')(organization)
    });
  },

  // TODO: this is gross. figure out a way to un-promisify
  @computed('isCurrentMember', 'session.isAuthenticated')
  showMembershipOptions(isCurrentMember, isAuthenticated) {
    return DS.PromiseObject.create({
      promise: isCurrentMember.then(value => (isAuthenticated && !value))
    });
  },

  @computed('currentUser', 'organization')
  membershipExpiresAt(currentUser, organization) {
    return currentUser.get('latestRenewalFor')(organization)
      .then(renewal => isPresent(renewal) && renewal.get('expiresAt'));
  }
});
