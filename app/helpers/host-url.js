import { helper } from '@ember/component/helper';
import env from '../config/environment';

export function hostUrl(params) {
  return env.APP.host;
}

export default helper(hostUrl);
