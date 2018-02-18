import { isEmpty } from '@ember/utils';
import Service, { inject as service } from '@ember/service';
import DS from 'ember-data';
import RSVP from 'rsvp';
import { computed } from 'ember-decorators/object';
import { alias } from 'ember-decorators/object/computed';


import { userIsMemberOf } from 'aeonvera/helpers/user/is-member-of';
import { userLatestRenewalFor } from 'aeonvera/helpers/user/latest-renewal-for';

export default class extends Service {
  session = service('session');
  crisp = service('crisp');
  rollbar = service();
  store = service();

  @alias('session.data.authenticated.id') id;
  @alias('user.name') name;

  @computed('user')
  get isMemberOf() {
    const user = this.get('user');

    return organization => RSVP.all([user, organization]).then(array => {
      const [user, organization] = array;

      return userIsMemberOf({}, { user, organization });
    });
  }

  @computed('user')
  get latestRenewalFor() {
    const user = this.get('user');

    return organization => RSVP.all([user, organization]).then(array => {
      const [user, organization] = array;

      return userLatestRenewalFor({}, { user, organization });
    });
  }

  @computed('session.data.authenticated.{token}')
  get user() {
    const token = this.get('session.data.authenticated.token');

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

    userPromise.then(u => this.set('rollbar.currentUser', { email: u.get('email') }));

    /* compatibility with old implementation of currentUser */
    this.get('session').set('currentUser', userPromise);
    this.get('crisp').setUserInfo(userPromise);

    return userPromise;
  }
}
