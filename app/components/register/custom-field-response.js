import Ember from 'ember';

export default Ember.Component.extend({

  response: null,

  didInsertElement(){
    this._super(...arguments);

    let response = this.get('store').createRecord('custom-field-response', {
      value: this.get('field.defaultValue'),
      customField: this.get('field'),
      writer: this.get('attendance')
    });

    this.set('response', response);
  },

  actions: {

  }
});
