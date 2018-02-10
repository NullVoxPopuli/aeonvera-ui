import { helper } from '@ember/component/helper';

export function hasDateExpired(date) {
  // null means not expired
  // now is greater than then
  return date != null && new Date() > date;
}

export default helper(function(params) {
  const date = params[0];

  return hasDateExpired(date);
});
