import Ember from 'ember';
import {task, timeout} from 'ember-concurrency';

import {userLatestRenewalFor} from 'aeonvera/helpers/user/latest-renewal-for';
import {userIsMemberOf} from 'aeonvera/helpers/user/is-member-of';

const {computed} = Ember;

const ProxyPromise = Ember.ObjectProxy.extend(Ember.PromiseProxyMixin);

export default Ember.Component.extend({
  // passed-in
  member: null,
  organization: null,

  // set
  latestRenewal: null,
  activeMembership: null,

  didReceiveAttrs() {
    this._super(...arguments);

    this.get('latestRenewalTask').perform();
    this.get('activeMembershipTask').perform();
  },

  expireDate: computed('latestRenewal', {
    get() {
      return this.get('latestRenewal.expiresAt');
    }
  }),

  activeMembershipTask: task(function * () {
    const organization = this.get('organization');
    const memberPromise = this.get('memberPromise');
    const active = yield memberPromise.then(member => {
      return userIsMemberOf({}, {user: member, organization});
    });

    this.set('activeMembership', active);
  }),

  latestRenewalTask: task(function * () {
    const organization = this.get('organization');
    const memberPromise = this.get('memberPromise');
    const renewal = yield memberPromise.then(member => {
      return userLatestRenewalFor({}, {user: member, organization});
    });

    this.set('latestRenewal', renewal);
  }),

  // if the page is refreshed, member will be a promise,
  // otherwise member will already be a resolved value
  memberPromise: computed('member', {
    get() {
      return this.get('member').asPromiseObject();
    }
  })
});
