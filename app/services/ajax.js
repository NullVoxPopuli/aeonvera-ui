import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import AjaxService from 'ember-ajax/services/ajax';
import ENV from 'aeonvera/config/environment';

export default AjaxService.extend({
  session: service(),
  namespace: '/api/',
  host: ENV.host,
  headers: computed('session.authToken', {
    get() {
      const headers = {};
      const authToken = this.get('session.data.authenticated.token');

      if (authToken) {
        const token = 'Bearer ' + authToken;

        headers.Authorization = token;
      }

      return headers;
    }
  })
});
