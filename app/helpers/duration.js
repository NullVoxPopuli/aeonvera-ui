import { helper } from '@ember/component/helper';

export function duration(params, hash) {
  // js is in milliseconds
  const seconds = params[0] * 1000;
  const unit = hash.unit || 'milliseconds';

  return moment.duration(seconds, unit).humanize();
}

export default helper(duration);
