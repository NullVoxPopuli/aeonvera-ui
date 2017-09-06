import Ember from 'ember';

import { computed } from 'ember-decorators/object';
import { oneWay } from 'ember-decorators/object/computed';

export default Ember.Component.extend({
  errors: [],

  @computed('errors.@each')
  errorsPresent(errors) {
    return Ember.isPresent(this.get('errors'));
  },

  didUpdateAttrs() {
    this.set('hidden', false);
  },

  @oneWay('errorsPresent') hidden: null,

  @computed('errors.@each', 'errorsPresent')
  firstError(errors, hasErrors) {
    if (!hasErrors) return;

    const firstErrorObject = errors.get('firstObject');

    // No error
    if (firstErrorObject === undefined) {
      return;
    }

    if (typeof (firstErrorObject) === 'string') {
      return firstErrorObject;
    }

    // Generic Unauthorized Error
    const code = firstErrorObject.code;

    if (code === 401) {
      return 'Not authorized. Please login as an authorized user.';
    }

    const source = firstErrorObject.source;
    let field = firstErrorObject.attribute;

    if (source !== undefined) {
      // JSON API Errors
      field = source.pointer.replace(/\/?data\/attributes\//, '');
      field = field.replace('-', ' ');
    }

    if (Array.isArray(firstErrorObject.message)) {
      // ember-model-validator
      return firstErrorObject.message[0];
    }

    // ember-data model error || JSON API error
    const reason = firstErrorObject.message || firstErrorObject.detail;

    // Errors on the root model
    // https://www.youtube.com/watch?v=IfeyUGZt8nk
    if (field === 'base') {
      return reason;
    }

    return field + ' ' + reason;
  },

  actions: {
    hideError() {
      this.set('hidden', true);
    }
  }

});
