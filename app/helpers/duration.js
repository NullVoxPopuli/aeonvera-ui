import Ember from 'ember';

export function duration(params, hash) {
  // js is in milliseconds
  const seconds = params[0] * 1000;
  const unit = hash.unit || 'milliseconds';
  return moment.duration(seconds, unit).humanize();
}

export default Ember.Helper.helper(duration);
