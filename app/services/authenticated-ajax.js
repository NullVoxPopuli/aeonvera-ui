import Ember from 'ember';
import ENV from 'aeonvera/config/environment';

export default Ember.Service.extend({
  session: Ember.inject.service(),

  GET(path) {
    return this._perform('GET', path, {});
  },

  POST(path, data) {
    return this._perform('POST', path, data);
  },

  PUT(path, data) {
    return this._perform('PUT', path, data);
  },

  _perform(method, path, data) {
    const url = ENV.host + path;
    const authToken = this.get('session.data.authenticated.token');

    return Ember.$.ajax({
      url: url,
      type: method,
      data: data,
      beforeSend(xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + authToken);
      }
    });
  }
});
