import Ember from 'ember';

import { userLatestRenewalFor } from 'aeonvera/helpers/user/latest-renewal-for';

export function userIsMemberOf(params, hash) {
  const { user, organization } = hash;
  const renewal = userLatestRenewalFor({}, { user, organization });

  return renewal.get('current');
}

export default Ember.Helper.helper(userIsMemberOf);
