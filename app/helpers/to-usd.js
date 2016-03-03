import Ember from 'ember';

export default Ember.Helper.helper(function (params) {
  let value = params[0];

  if (value === undefined) {
    return value;
  }

  let amount = (value || 0).toFixed(2);
  let sign = '$';

  return `${sign} ${amount}`;
});
