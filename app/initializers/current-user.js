// from here:
// modified to work with aeonvera's particular setup
// http://discuss.emberjs.com/t/best-practice-for-loading-and-persisting-current-user-in-an-authenticated-system/6987/6

import Ember from "ember";
import Session from "simple-auth/session";

export default {
  name: "current-user",
  before: "simple-auth",
  initialize: function(container) {
    Session.reopen({
      setCurrentUser: function() {
        var accessToken = this.get('secure.token');

        /*
          not sure if this will be needed, but token and email are
          the two relevant fields on the secure object.
          var email = this.get('secure.email');
        */

        var self = this;

        /*
          the token will be present if we are logged in
        */
        if (!Ember.isEmpty(accessToken)) {
          /*
            make a call to the server that only returns the current user
            see UserController#show
          */
          return container.lookup('store:main')
            /*
              the id of 0 here doesn't actually matter,
              the server alwasy returns the current user.
              This is just to route to the show action on the controller.
            */
            .find('user', 0).then(function(user) {
              self.set('content.currentUser', user);
          });
        }
      }.observes('secure.token')
    });
  }
};
