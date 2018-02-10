import { isPresent } from '@ember/utils';
import { helper } from '@ember/component/helper';

export default helper(function(params) {
  let date = params[0];
  const format = params[1];
  const allowBlank = params[2];

  if (typeof (date) === 'number') {
    date = new Date(date * 1000);
  }

  if (!isPresent(date) && allowBlank) {
    return '';
  }

  return moment(date).format(format);
});
