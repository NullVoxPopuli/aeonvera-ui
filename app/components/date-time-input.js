import Ember from 'ember';

export default Ember.Component.extend({

  fieldValue: Ember.computed('model', 'field', function () {
    let fieldName = this.get('field');
    let value = this.get('model.' + fieldName);
    return value;
  }).readOnly(),

  actions: {
    dateChanged: function (value) {
      let model = this.get('model');
      let field = this.get('field');

      model.set(field, value);
    },
  },
});
