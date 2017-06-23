import Ember from 'ember';
import RSVP from 'rsvp';

import currentUserHelpers from 'aeonvera/mixins/current-user-helpers';

const { isPresent } = Ember;

export default Ember.Route.extend(currentUserHelpers, {

  beforeModel() {
    const loggedIn = this.get('loggedIn');

    if (!loggedIn) {
      this.transitionTo('register.community-registration.tell-us-who-you-are');
    } else {
      this.transitionTo('register.community-registration.register');
    }
  }
});
