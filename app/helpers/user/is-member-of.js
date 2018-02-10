import { helper } from '@ember/component/helper';
import { isBlank, isPresent } from '@ember/utils';
import { userLatestRenewalFor } from 'aeonvera/helpers/user/latest-renewal-for';

export function userIsMemberOf(params, hash) {
  const { user, organization } = hash;

  if (isBlank(user)) {
    return;
  }

  const renewal = userLatestRenewalFor({}, { user, organization });

  return renewal && renewal.get('current');
}

export default helper(userIsMemberOf);
