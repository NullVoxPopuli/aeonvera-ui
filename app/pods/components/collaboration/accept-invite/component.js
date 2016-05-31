import Ember from 'ember';
import ENV from 'aeonvera/config/environment';

export default Ember.Component.extend({
  errors: [],
  didInsertElement() {
    this._super(...arguments);

    // send a GET to the api/confirmations
    let token = this.get('token');
    let hostId = this.get('hostId');
    let hostType = this.get('hostType');

    let url = ENV.host + '/api/users/collaboration?token=' + token +
      '&host_id=' + hostId + '&host_type=' + hostType;

    Ember.$.ajax(url, {
      method: 'PUT'
    }).then(success => {
      this.sendAction('successAction');
    }, error => {
      let json = JSON.parse(error.responseText);
      let errors = json.errors;

      this.set('errors', errors);
    });
  }
});
