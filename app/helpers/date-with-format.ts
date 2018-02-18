import { isPresent } from '@ember/utils';
import { helper } from '@ember/component/helper';
import moment from 'moment';


export type IDate = number | string | Date;

export function formatDateWith(date: IDate, format: string, allowBlank: boolean = false): string {
  if (typeof(date) === 'number') {
    date = new Date(date * 1000);
  }

  if (!isPresent(date) && allowBlank) {
    return '';
  }

  return moment(date).format(format);
}

export default helper(function(params) {
  let date: IDate = params[0];
  const format: string = params[1];
  const allowBlank: boolean = params[2];

  return formatDateWith(date, format, allowBlank);
});
