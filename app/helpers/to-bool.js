import Ember from 'ember';

export default Ember.Helper.helper(function (params) {
  let value = params[0];

  let boolValue = (!!value || value == 't');

  return boolValue ? 'Yes' : 'No';
});
