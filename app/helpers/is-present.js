import Ember from 'ember';

export default Ember.Helper.helper(function(params) {
  const value = params[0];

  return Ember.isPresent(value);
});
