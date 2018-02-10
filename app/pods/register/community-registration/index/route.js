import Route from '@ember/routing/route';
import { isPresent } from '@ember/utils';
import RSVP from 'rsvp';

import currentUserHelpers from 'aeonvera/mixins/current-user-helpers';

export default Route.extend(currentUserHelpers, {

  beforeModel() {
    const loggedIn = this.get('loggedIn');

    if (!loggedIn) {
      this.transitionTo('register.community-registration.tell-us-who-you-are');
    } else {
      this.transitionTo('register.community-registration.register');
    }
  }
});
