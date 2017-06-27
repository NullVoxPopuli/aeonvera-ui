import Ember from 'ember';
import RSVP from 'rsvp';
import DS from 'ember-data';

import computed, { alias, readOnly } from 'ember-computed-decorators';
import { PropTypes } from 'ember-prop-types';

import { userLatestRenewalFor } from 'aeonvera/helpers/user/latest-renewal-for';

const { isPresent, inject: { service } } = Ember;

export default class extends Ember.Component {
  static propTypes = {
    organization: PropTypes.EmberObject.isRequired,
    order: PropTypes.EmberObject.isRequired,
    token: PropTypes.any
  }

  session = service('session');
  currentUser = service('current-user');
  cart = service('order-cart');

  @readOnly
  @computed('organization.{name}')
  title(name) {
    return `Register for ${name}`;
  }

  @alias('session.isAuthenticated') loggedIn;
  @alias('cart.userFirstName') firstName;
  @alias('cart.userLastName') lastName;
  @alias('cart.userEmail') email;

  @computed('currentUser', 'organization', 'session.currentUser', 'session.isAuthenticated')
  isCurrentMember(currentUser, organization) {
    return DS.PromiseObject.create({
      promise: currentUser.get('isMemberOf')(organization)
    });
  }

  @computed('isCurrentMember', 'session.{isAuthenticated}')
  showMembershipOptions(isCurrentMember, isAuthenticated) {
    return (isAuthenticated && !isCurrentMember);
  }

  @computed('currentUser', 'organization')
  membershipExpiresAt(currentUser, organization) {
    return currentUser.get('latestRenewalFor')(organization)
      .then(renewal => isPresent(renewal) && renewal.get('expiresAt'));
  }
};
