import Ember from 'ember';
import ENV from 'aeonvera/config/environment';

export default Ember.Component.extend({
  errors: [],
  didInsertElement() {
    this._super(...arguments);

    // send a GET to the api/confirmations
    const token = this.get('confirmationToken');
    const url = ENV.host + '/api/confirmation?confirmation_token=' + token;

    Ember.$.getJSON(url).then(success => {
      this.sendAction('successAction');
    }, error => {
      const json = JSON.parse(error.responseText);
      const errors = json.errors;

      this.set('errors', errors);
    });
  }
});
