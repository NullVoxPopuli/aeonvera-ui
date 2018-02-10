import { isPresent } from '@ember/utils';
import { helper } from '@ember/component/helper';

export default helper(function(params) {
  const value = params[0];

  return isPresent(value);
});
