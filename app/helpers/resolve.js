import Ember from 'ember';
import RSVP from 'rsvp';

export function resolve(params/* , hash*/) {
  return RSVP.resolve(params[0]);
}

export default Ember.Helper.helper(resolve);
