import Ember from "ember";

export default Ember.Helper.helper(function(params) {
  let value = params[0];

  if (value === undefined) {
    return value;
  }

  var amount = (value || 0).toFixed(2),
    sign = '$';

  return `${sign}${amount}`;
});
