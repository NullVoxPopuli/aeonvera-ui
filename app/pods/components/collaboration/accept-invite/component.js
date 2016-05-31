import Ember from 'ember';
import ENV from 'aeonvera/config/environment';

export default Ember.Component.extend({
  session: Ember.inject.service(),

  errors: [],
  didInsertElement() {
    this._super(...arguments);

    // send a GET to the api/confirmations
    let token = this.get('token');
    let hostId = this.get('hostId');
    let hostType = this.get('hostType');

    let url = ENV.host + '/api/users/collaborations?token=' + token +
      '&host_id=' + hostId + '&host_type=' + hostType;

    let authToken = this.get('session.data.authenticated.token');

    Ember.$.ajax(url, {
      method: 'PUT',
      beforeSend(xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + authToken);
      }
    }).then(success => {
      this.sendAction('successAction');
    }, error => {
      let json = JSON.parse(error.responseText);
      let errors = json.errors;

      this.set('errors', errors);
    });
  }
});
