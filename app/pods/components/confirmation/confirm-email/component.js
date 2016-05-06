import Ember from 'ember';
import ENV from 'aeonvera/config/environment';

export default Ember.Component.extend({
  errors: [],
  didInsertElement() {
    this._super(...arguments);

    // send a GET to the api/confirmations
    let token = this.get('confirmationToken');
    let url = ENV.host + '/api/confirmation?confirmation_token=' + token;

    Ember.$.getJSON(url).then(success => {
      this.sendAction('successAction');
    }, error => {
      let json = JSON.parse(error.responseText);
      let errors = json.errors;

      this.set('errors', errors);
    });
  }
});
