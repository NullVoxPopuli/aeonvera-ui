import Ember from 'ember';

export default Ember.Helper.helper(function(params) {
  const one = params[0];
  const two = params[1];

  return one > two;
});
