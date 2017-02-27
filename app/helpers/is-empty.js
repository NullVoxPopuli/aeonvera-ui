import Ember from 'ember';

export function isEmpty(params/* , hash*/) {
  const value = params[0];

  return Ember.isEmpty(value);
}

export default Ember.Helper.helper(isEmpty);
