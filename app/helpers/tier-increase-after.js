import { isPresent } from '@ember/utils';
import { helper } from '@ember/component/helper';

export default helper(function(params) {
  const date = params[0];
  const regs = params[1];

  const hasDate = isPresent(date);
  const hasRegLimit = isPresent(regs);

  let result = '';

  if (hasDate) {
    result = date;
  }

  if (hasDate && hasRegLimit) {
    result += ' or ';
  }

  if (hasRegLimit) {
    result += `${regs} Registrations`;
  }

  return result;
});
