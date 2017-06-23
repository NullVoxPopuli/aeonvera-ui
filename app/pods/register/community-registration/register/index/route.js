import Ember from 'ember';
import RSVP from 'rsvp';
import computed from 'ember-computed-decorators';

import RandomString from 'aeonvera/mixins/helpers/string';
import currentUserHelpers from 'aeonvera/mixins/current-user-helpers';

const { isPresent } = Ember;

export default Ember.Route.extend(currentUserHelpers, RandomString, {
  beforeModel(transition) {
    const loggedIn = this.get('loggedIn');

    const { queryParams: { firstName, lastName, email } } = transition;

    const allowedToRegister = (
      loggedIn || (
        isPresent(firstName) &&
        isPresent(lastName) &&
        isPresent(email)
      )
    );

    if (!allowedToRegister) {
      this.transitionTo('register.community-registration.tell-us-who-you-are');
    }
  },

  model(params, transition) {
    let token = transition.queryParams.token;
    let order = null;

    const loggedIn = this.get('loggedIn');
    const store = this.get('store');
    const organization = this.modelFor('register.community-registration');

    if (!loggedIn) {
      transition.queryParams.token = orderParams.token;
    }

    // If a token is present, look up the order.
    // If a token is not present, the order will be created as needed.
    if (isPresent(token)) {
      token = token || this.randomString('order', 128);
      order = store.findRecord('order', { token: token });
    }

    return RSVP.hash({
      order,
      organization
    });
  }
});
