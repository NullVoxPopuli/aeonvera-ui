import Ember from 'ember';

export function isIncluded(params/* , hash*/) {
  const array = params[0];
  const value = params[1];

  return array.includes(value);
}

export default Ember.Helper.helper(isIncluded);
