import Ember from 'ember';

export default Ember.Helper.helper(function (params/*, hash*/) {
  var cents = params[0];
  return cents / 100.0;
});
