import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';
import { computed, readOnly } from 'ember-decorators/object';
import { alias } from 'ember-decorators/object/computed';


import { userLatestRenewalFor } from 'aeonvera/helpers/user/latest-renewal-for';
import { userIsMemberOf } from 'aeonvera/helpers/user/is-member-of';

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

  @readOnly
  @alias('latestRenewal.expiresAt') expireDate: null,

  activeMembershipTask: task(function * () {
    const organization = this.get('organization');
    const member = yield this.get('member');
    const active = userIsMemberOf({}, { user: member, organization });

    this.set('activeMembership', active);
  }),

  latestRenewalTask: task(function * () {
    const organization = this.get('organization');
    const member = yield this.get('member');
    const renewal = userLatestRenewalFor({}, { user: member, organization });

    this.set('latestRenewal', renewal);
  })

});
