import Ember from 'ember';
import Devise from 'simple-auth-devise/authenticators/devise';

var alreadyRun = false;

export default {
  name: 'simple-auth-devise-override',

  initialize: function() {
    if (alreadyRun) {
      return;
    } else {
      alreadyRun = true;
    }

    Devise.reopen({
      invalidate: function() {
        var self = this;

        /*
          this is required until server-side sessions are disabled
        */
        return Ember.$.ajax({
          url: '/users/sign_out',
          type: 'DELETE'
        }).then(function() {
          return self._super();
        });
      }
    });
  }
};
