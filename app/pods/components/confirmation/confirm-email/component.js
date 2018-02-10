import $ from 'jquery';
import Component from '@ember/component';
import ENV from 'aeonvera/config/environment';

export default Component.extend({
  errors: [],
  didInsertElement() {
    this._super(...arguments);

    // send a GET to the api/confirmations
    const token = this.get('confirmationToken');
    const url = ENV.host + '/api/confirmation?confirmation_token=' + token;

    $.getJSON(url).then(success => {
      this.sendAction('successAction');
    }, error => {
      const json = JSON.parse(error.responseText);
      const errors = json.errors;

      this.set('errors', errors);
    });
  }
});
