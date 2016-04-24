import Ember from 'ember';

export default Ember.Component.extend({
  cart: Ember.inject.service('order-cart'),

  // response: null,

  // didInsertElement(){
  //   this._super(...arguments);
  //
  //   Ember.run.later(() => {
  //   });
  // },

  response: Ember.computed('attendance', function() {
      let attendance = this.get('attendance');

      if (attendance != null) {

        let response = this.get('store').createRecord('custom-field-response', {
          value: this.get('field.defaultValue'),
          customField: this.get('field'),
          writer: this.get('attendance')
        });

        attendance.get('customFieldResponses').pushObject(response);

        return response;
      }
    }),

  actions: {

  }
});
