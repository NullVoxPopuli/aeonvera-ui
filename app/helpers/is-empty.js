import { helper } from '@ember/component/helper';
import { isEmpty } from '@ember/utils';

export function testIsEmpty(params/* , hash*/) {
  const value = params[0];

  return isEmpty(value);
}

export default helper(testIsEmpty);
