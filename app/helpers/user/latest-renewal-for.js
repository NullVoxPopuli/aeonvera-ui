import Ember from 'ember';

const { isPresent, isBlank } = Ember;

export function userLatestRenewalFor(params, hash) {
  const { user, organization } = hash;

  if (isBlank(user)) {
    return;
  }

  const membershipRenewals = user.get('membershipRenewals');
  const renewalsMatchingOrganization = [];

  membershipRenewals.forEach((item, i, e) => {
    const related = item.get('membershipOption.host');
    const match = (related &&
      related.get('id') === organization.get('id') &&
      related.get('domain') === organization.get('domain'));

    if (match) renewalsMatchingOrganization.push(item);
  });

  let latestDate = null;
  let latestRenewal = null;

  renewalsMatchingOrganization.forEach(item => {
    const expiresAt = item.get('expiresAt');

    if (latestDate == null || latestDate < expiresAt) {
      latestRenewal = item;
      latestDate = expiresAt;
    }
  });

  return latestRenewal;
}

export default Ember.Helper.helper(userLatestRenewalFor);
