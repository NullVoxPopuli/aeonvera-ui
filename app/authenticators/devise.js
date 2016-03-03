import Ember from 'ember';
import Devise from 'ember-simple-auth/authenticators/devise';
import ENV from '../config/environment';

export default Devise.extend({
  tokenAttributeName: 'token',
  identificationAttributeName: 'email',
  serverTokenEndpoint: ENV.devise.serverTokenEndpoint,

  invalidate: function () {
    /*
      this is required until server-side sessions are disabled
    */
    return Ember.$.ajax({
      url: ENV.host + '/users/sign_out',
      type: 'DELETE',
    }).then(() =>  this._super());
  },
});
