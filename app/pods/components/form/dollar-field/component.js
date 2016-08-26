import Ember from 'ember';

export default Ember.Component.extend({

  // set by caller
  labelText: '',
  model: null,
  field: '',
  errors: [],
  classes: '',
  disabled: false,
  placeholder: '',

  // if value is passed in, we can ignore model and field
  // when passed, it must be initialized to something other
  // than undefined
  value: undefined,

  fieldValue: Ember.computed('model', 'field', 'value', {
    get(key) {
      if (this.get('value') !== undefined) { return this.get('value'); }

      let fieldName = this.get('field');
      let value = this.get('model.' + fieldName);
      return value;
    },

    set(key, value) {
      if (this.get('value') !== undefined) {
        this.set('value', value);
        return value;
      }

      let model = this.get('model');
      let field = this.get('field');
      model.set(field, value);
      return value;
    }
  }),
});
