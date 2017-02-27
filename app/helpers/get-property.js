import Ember from 'ember';

export default Ember.Helper.helper(function(params) {
  const object = params[0];
  const property = params[1];

  if (object.get !== undefined) {
    return object.get(property);
  }
  return object[property];

});
