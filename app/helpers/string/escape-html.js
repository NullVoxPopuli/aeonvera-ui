import Ember from 'ember';

export function escapeHTML(string) {
  return Ember.$('<div />').text(string).html();
}

export default Ember.Helper.helper((params, hash) => escapeHTML(params[0]));
