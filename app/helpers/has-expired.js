import Ember from 'ember';

export default Ember.Helper.helper(function (params) {
  let date = params[0];

  return new Date() > date;
});
