import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';
import ENV from 'aeonvera/config/environment';

export default AjaxService.extend({
  session: Ember.inject.service(),
  namespace: '/api/',
  host: ENV.host,
  headers: Ember.computed('session.authToken', {
    get() {
      let headers = {};
      let authToken = this.get('session.data.authenticated.token');
      if (authToken) {
        let token = 'Bearer ' + authToken;
        headers.Authorization = token;
      }

      return headers;
    }
  })
});
