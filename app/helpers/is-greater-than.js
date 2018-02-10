import { helper } from '@ember/component/helper';

export default helper(function(params) {
  const one = params[0];
  const two = params[1];

  return one > two;
});
