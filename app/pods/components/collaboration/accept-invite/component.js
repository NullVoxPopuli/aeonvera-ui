import Ember from 'ember';
import ENV from 'aeonvera/config/environment';

export default Ember.Component.extend({
  session: Ember.inject.service(),

  errors: [],
  didInsertElement() {
    this._super(...arguments);

    // send a GET to the api/confirmations
    const token = this.get('token');
    const hostId = this.get('hostId');
    const hostType = this.get('hostType');

    const url = ENV.host + '/api/users/collaborations?token=' + token +
      '&host_id=' + hostId + '&host_type=' + hostType;

    const authToken = this.get('session.data.authenticated.token');

    Ember.$.ajax(url, {
      method: 'PUT',
      beforeSend(xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + authToken);
      }
    }).then(success => {
      this.sendAction('successAction');
    }, error => {
      const json = JSON.parse(error.responseText);
      const errors = json.errors;

      this.set('errors', errors);
    });
  }
});
