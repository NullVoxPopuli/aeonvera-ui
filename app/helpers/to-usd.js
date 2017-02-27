import Ember from 'ember';

export default Ember.Helper.helper(function(params) {
  let value = params[0];

  if (value === undefined) {
    return value;
  }

  if (typeof (value) === 'string') {
    value = parseFloat(value);
  }

  const amount = (value || 0).toFixed(2);
  const sign = '$';

  return `${sign} ${amount}`;
});
