import Ember from 'ember';

export function isIncluded(params/*, hash*/) {
  let array = params[0];
  let value = params[1];

  return array.includes(value);
}

export default Ember.Helper.helper(isIncluded);
