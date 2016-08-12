import Ember from 'ember';
import DS from 'ember-data';
const { isBlank } = Ember;
const { PromiseObject } = DS;

export default Ember.Component.extend({
  fieldValue: Ember.computed('model', 'field', function () {
    let fieldName = this.get('field');
    let value = this.get('model.' + fieldName);
    return value;
  }).readOnly(),

  actions: {
    dateChanged(value) {
      if (isBlank(value)) { value = ''; }

      let model = this.get('model');

      let field = this.get('field');

      // in case the model is a promise...
      // this Datepicker plugin is weird
      model.asPromiseObject().then(m => {
        m.set(field, value);
      });
    },
  },
});
