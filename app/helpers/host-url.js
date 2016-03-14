import Ember from 'ember';
import env from '../config/environment';

export function hostUrl(params) {
  return env.APP.host;
}

export default Ember.Helper.helper(hostUrl);
