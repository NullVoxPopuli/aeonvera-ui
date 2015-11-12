import Ember from 'ember';

export default Ember.Helper.helper(function(params) {
  let object = params[0];
  let klass = params[1];

  let objectModelName = object.get('constructor.modelName');
  let isA = objectModelName === klass;

  return isA;
});
