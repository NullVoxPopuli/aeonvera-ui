import Ember from 'ember';

export default Ember.Helper.helper(function(params) {
  let one = params[0];
  let two = params[1];

  return one == two;
});
