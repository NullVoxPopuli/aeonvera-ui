import Helper from '@ember/component/helper';

export function isEqual(params) {
  const one = params[0];
  const two = params[1];

  return one === two;
}

export default Helper.extend({
  compute(params) {
    return isEqual(params);
  }
});
