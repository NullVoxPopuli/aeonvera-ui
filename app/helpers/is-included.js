import { helper } from '@ember/component/helper';

export function isIncluded(params/* , hash*/) {
  const array = params[0];
  const value = params[1];

  return array.includes(value);
}

export default helper(isIncluded);
