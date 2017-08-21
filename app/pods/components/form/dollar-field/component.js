import Ember from 'ember';

import { computed } from 'ember-decorators/object';

export default class extends Ember.Component {
  // set by caller
  labelText = '';
  model = null;
  field = '';
  errors = [];
  classes = '';
  disabled = false;
  placeholder = '';

  // if value is passed in, we can ignore model and field
  // when passed, it must be initialized to something other
  // than undefined
  value = undefined;

  @computed('errors.@each', 'field')
  fieldErrors(errors, field) {
    return errors.get(field);
  }

  @computed('model', 'field', 'value')
  fieldValue = {
    get(model, field, value) {
      if (value !== undefined) {
        return value;
      }

      return this.get('model.' + field);
    },

    set(newValue, model, field, value) {
      if (newValue !== undefined) {
        this.set('value', newValue);
        return newValue;
      }

      model.set(field, newValue);
      return newValue;
    }
  }
}
