import RSVP from 'rsvp';

export function initialize(/* application */) {
  // This forces the async/await polyfill to use RSVP.Promise
  window.Promise = RSVP.Promise;
}

export default {
  name: 'set-global-promise-for-async-await',
  initialize
};
