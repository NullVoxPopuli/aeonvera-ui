import Ember from 'ember';

import currentUserHelpers from 'aeonvera/mixins/current-user-helpers';

const { observer } = Ember;

export default Ember.Route.extend(currentUserHelpers, {
  beforeModel() {
    const loggedIn = this.get('loggedIn');

    if (loggedIn) {
      this.transitionTo('register.community-registration.register');
    }
  },

  model() {
    return this.modelFor('register.community-registration');
  },

  watchLoggedInStatus: observer('loggedIn', function() {
    const loggedIn = this.get('loggedIn');

    if (loggedIn) {
      this.transitionTo('register.community-registration.register');
    }
  })
});
