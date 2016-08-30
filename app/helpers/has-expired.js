import Ember from 'ember';

export function hasDateExpired(date) {
  // null means not expired
  // now is greater than then
  return date != null && new Date() > date;
}

export default Ember.Helper.helper(function (params) {
  let date = params[0];

  return hasDateExpired(date);
});
