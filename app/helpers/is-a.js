import Ember from 'ember';

export function isA(params) {
  const object = params[0];
  const klass = params[1];

  const objectModelName = object.get('constructor.modelName');
  const isA = objectModelName === klass;

  return isA;
}

export default Ember.Helper.helper(isA);
