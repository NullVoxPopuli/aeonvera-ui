import { isPresent } from '@ember/utils';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  cart: service('order-cart'),

  response: computed('registration', function() {
    const registration = this.get('registration');

    if (registration != null) {

      const field = this.get('field');
      const existingCustomField = registration
        .get('customFieldResponses')
        .find(item => field.get('id') === item.get('customField.id'));

      if (isPresent(existingCustomField)) {

        // if datetime...
        const kind = field.get('kind');

        // if (kind >= 3 && kind <= 5){
        //   // convert the string value to time
        //   // let value = existingCustomField.get('value');
        //   // existingCustomField.set('value', moment(value).format('lll'));
        // }
        return existingCustomField;
      }

      const response = this.get('store').createRecord('custom-field-response', {
        value: this.get('field.defaultValue'),
        customField: field,
        writer: this.get('registration')
      });

      registration.get('customFieldResponses').pushObject(response);

      return response;
    }
  }),

  actions: {

  }
});
