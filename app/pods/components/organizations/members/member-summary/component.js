import Component from '@ember/component';
import PromiseProxyMixin from '@ember/object/promise-proxy-mixin';
import ObjectProxy from '@ember/object/proxy';
import { task, timeout } from 'ember-concurrency';
import { computed, readOnly } from 'ember-decorators/object';
import { alias } from 'ember-decorators/object/computed';


import { userLatestRenewalFor } from 'aeonvera/helpers/user/latest-renewal-for';
import { userIsMemberOf } from 'aeonvera/helpers/user/is-member-of';

const ProxyPromise = ObjectProxy.extend(PromiseProxyMixin);

export default Component.extend({
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
