import Route from '@ember/routing/route';
import { observer } from '@ember/object';

import currentUserHelpers from 'aeonvera/mixins/current-user-helpers';

export default Route.extend(currentUserHelpers, {
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
