import Ember from 'ember';
import Devise from 'ember-simple-auth/authenticators/devise';


export default Devise.extend({
  tokenAttributeName: 'token',
  identificationAttributeName: 'email',

  invalidate: function() {
    var self = this;

    /*
      this is required until server-side sessions are disabled
    */
    return Ember.$.ajax({
      // url: 'http://swing.vhost:3000/users/sign_out',
      url: '/users/sign_out',
      type: 'DELETE'
    }).then(function() {
      return self._super();
    });
  }
});
