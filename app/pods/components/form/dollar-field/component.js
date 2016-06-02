import Ember from 'ember';

export default Ember.Component.extend({

  // set by caller
  labelText: '',
  model: null,
  field: '',
  errors: [],
  classes: '',

  fieldValue: Ember.computed('model', 'field', {
    get(key) {
      let fieldName = this.get('field');
      let value = this.get('model.' + fieldName);
      return value;
    },
    set(key, value) {
      let model = this.get('model');
      let field = this.get('field');
      model.set(field, value);
      return value;
    }
  }),
});
