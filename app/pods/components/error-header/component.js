import Ember from 'ember';

import { computed, action } from 'ember-decorators/object';
import { oneWay } from 'ember-decorators/object/computed';

import { messageFromError } from 'aeonvera/helpers/message-from-error';

export const NOT_AUTHORIZED = 'Not authorized. Please login as an authorized user.';

const { get, set, isPresent } = Ember;

export default Ember.Component.extend({
  @oneWay('errorsPresent') hidden: null,

  didUpdateAttrs() {
    set(this, 'hidden', false);
  },

  // cannot use notEmpty with .@each,
  // because .@each expects array of objects.
  @computed('errors.@each')
  errorsPresent(errors) {
    return isPresent(errors);
  },


  @computed('errors.@each', 'errorsPresent')
  firstError(errors, hasErrors) {
    if (!hasErrors) return '';

    const firstErrorObject = get(errors, 'firstObject');
    const noError = firstErrorObject === undefined || typeof(firstErrorObject) == 'string';

    if (noError) return firstErrorObject;

    if (firstErrorObject.code === 401) {
      return NOT_AUTHORIZED;
    }

    const message = messageFromError({ errors });

    // force an array, return first element
    return (Array.from(message))[0];
  },

  @action
  hideError() {
    set(this, 'hidden', true);
  }
});
