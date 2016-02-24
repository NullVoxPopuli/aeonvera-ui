import Ember from 'ember';

export default Ember.Helper.helper(function (params) {
  let object = params[0];
  let property = params[1];

  if (object.get !== undefined) {
    return object.get(property);
  } else {
    return object[property];
  }
});
