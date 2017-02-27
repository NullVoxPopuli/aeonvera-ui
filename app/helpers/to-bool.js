import Ember from 'ember';

export default Ember.Helper.helper(function(params) {
  const value = params[0];

  const boolValue = (
    value === true ||
    value === 't');

  return boolValue ? 'Yes' : 'No';
});
