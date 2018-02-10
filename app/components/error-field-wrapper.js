import { isArray } from '@ember/array';
import { isEmpty } from '@ember/utils';
import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  classNameBindings: [
    'hasError:error:no-error', 'classes'
  ],

  /*
    do we want to also include the field name?
    most of the time the field will be accompanied
    by a label tag, so we won't need this.
  */
  includeFieldName: false,
  /*
    the name of the field to display when
    includeFieldName is true.
  */
  fieldName: '',

  hasError: computed('fieldErrors.@each', function() {
    const errors = this.get('fieldErrors');

    return (errors.length > 0);
  }),

  fieldErrors: computed('errors.@each', 'field', function() {
    const field = this.get('field');
    const error = (this.get('errors.' + field) || []);

    if (isEmpty(error)) {
      return error;
    }

    if (isArray(error)) {
      if (error.get('firstObject.message') === undefined) {
        return error.map(e => ({ message: e }));
      }

      return error;
    }

    return [error];
  })
});
