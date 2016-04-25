import Ember from 'ember';

export default Ember.Component.extend({
  cart: Ember.inject.service('order-cart'),

  response: Ember.computed('attendance', function() {
      let attendance = this.get('attendance');

      if (attendance != null) {

        let field = this.get('field');
        let existingCustomField = attendance.get('customFieldResponses').find(item => {
          return field.get('id') === item.get('customField.id');
        });

        if (Ember.isPresent(existingCustomField)){
          // if datetime...
          let kind = field.get('kind');
          if (kind >= 3 && kind <= 5){
            // convert the string value to time
            // let value = existingCustomField.get('value');
            // existingCustomField.set('value', moment(value).format('lll'));
          }
          return existingCustomField;
        }

        let response = this.get('store').createRecord('custom-field-response', {
          value: this.get('field.defaultValue'),
          customField: field,
          writer: this.get('attendance')
        });

        attendance.get('customFieldResponses').pushObject(response);

        return response;
      }
    }),

  actions: {

  }
});
