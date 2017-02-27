import Ember from 'ember';

export function isEqual(params) {
  const one = params[0];
  const two = params[1];

  return one === two;
}

export default Ember.Helper.extend({
  compute(params) {
    return isEqual(params);
  }
});
