import { computed } from '@ember/object';
import Component from '@ember/component';
import { isBlank } from '@ember/utils';
import DS from 'ember-data';
const { PromiseObject } = DS;

export default Component.extend({
  fieldValue: computed('model', 'field', function() {
    const fieldName = this.get('field');
    const value = this.get('model.' + fieldName);

    return value;
  }).readOnly(),

  actions: {
    dateChanged(value) {
      if (isBlank(value)) {
        value = '';
      }

      const model = this.get('model');

      const field = this.get('field');

      // in case the model is a promise...
      // this Datepicker plugin is weird
      model.asPromiseObject().then(m => {
        m.set(field, value);
      });
    }
  }
});
