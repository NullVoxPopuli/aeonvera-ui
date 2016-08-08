import Ember from 'ember';

export default Ember.Component.extend({
  errors: [],
  errorsPresent: Ember.computed('errors.@each', function() {
    return Ember.isPresent(this.get('errors'));
  }),

  firstError: Ember.computed('errors.@each', function() {
    let firstErrorObject = this.get('errors.firstObject');

    // No error
    if (firstErrorObject === undefined) {
      return;
    }

    if (typeof (firstErrorObject) === 'string') {
      return firstErrorObject;
    }

    // Generic Unauthorized Error
    let code = firstErrorObject.code;
    if (code === 401) {
      return 'Not authorized. Please login as an authorized user.';
    }

    let source = firstErrorObject.source;
    let field = firstErrorObject.attribute;

    if (source !== undefined) {
      // JSON API Errors
      field = source.pointer.replace('/data/attributes/', '');
      field = field.replace('-', ' ');
    }

    if (Array.isArray(firstErrorObject.message)) {
      // ember-model-validator
      return firstErrorObject.message[0];
    }

    // ember-data model error || JSON API error
    let reason = firstErrorObject.message || firstErrorObject.detail;
    return field + ' ' + reason;
  }),

  actions: {
    hideError() {
      this.set('errorsPresent', false);
    },
  }

});
