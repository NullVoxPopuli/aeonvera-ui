import Ember from 'ember';
import DS from 'ember-data';
import RSVP from 'rsvp';
import computed, { alias } from 'ember-computed-decorators';

import { userIsMemberOf } from 'aeonvera/helpers/user/is-member-of';
import { userLatestRenewalFor } from 'aeonvera/helpers/user/latest-renewal-for';

const { isEmpty, inject: { service } } = Ember;

export default class extends Ember.Service {
  session = service('session');
  rollbar = service();
  store = service();

  @alias('session.data.authenticated.id') id;
  @alias('user.name') name;

  @computed('user')
  isMemberOf(user) {
    return organization => RSVP.all([user, organization]).then(array => {
      const [user, organization] = array;

      return userIsMemberOf({}, { user, organization });
    });
  }

  @computed('user')
  latestRenewalFor(user) {
    return organization => RSVP.all([user, organization]).then(array => {
      const [user, organization] = array;

      return userLatestRenewalFor({}, { user, organization });
    });
  }

  @computed('session.data.authenticated.{token}')
  user(token) {
    if (isEmpty(token)) {
      return null;
    }

    const store = this.get('store');

    /*
      the id of current-user here doesn't actually matter,
      the server always returns the current user.
      This is just to route to the show action on the controller.
    */
    const userPromise = store.findRecord('user', 'current-user', {
      include: 'membership_renewals.membership_option'
    });

    userPromise.then(u => this.set('rollbar.currentUser', { email: u.email }));

    /* compatibility with old implementation of currentUser */
    this.get('session').set('currentUser', userPromise);

    return userPromise;
  }
}
