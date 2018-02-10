import { helper } from '@ember/component/helper';
import RSVP from 'rsvp';

export function resolve(params/* , hash*/) {
  return RSVP.resolve(params[0]);
}

export default helper(resolve);
