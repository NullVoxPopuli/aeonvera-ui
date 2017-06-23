import Ember from 'ember';
import { userLatestRenewalFor } from 'aeonvera/helpers/user/latest-renewal-for';

const { isPresent, isBlank } = Ember;

export function userIsMemberOf(params, hash) {
  const { user, organization } = hash;

  if (isBlank(user)) {
    return;
  }

  const renewal = userLatestRenewalFor({}, { user, organization });

  return renewal.get('current');
}

export default Ember.Helper.helper(userIsMemberOf);
