import Ember from 'ember';
import RSVP from 'rsvp';
import computed from 'ember-computed-decorators';

import RandomString from 'aeonvera/mixins/helpers/string';
import currentUserHelpers from 'aeonvera/mixins/current-user-helpers';

const { isPresent, isBlank, inject } = Ember;

export default Ember.Route.extend(currentUserHelpers, RandomString, {
  rollbar: inject.service('rollbar'),
  flash: inject.service('flash-notification'),

  beforeModel(transition) {
    const loggedIn = this.get('loggedIn');

    const { queryParams: { firstName, lastName, email, token } } = transition;

    const allowedToRegister = (
      loggedIn || (
        isPresent(firstName) &&
        isPresent(lastName) &&
        isPresent(email) &&
        isPresent(token)
      )
    );

    if (!allowedToRegister) {
      this.transitionTo('register.community-registration.tell-us-who-you-are');
    }
  },

  model(params, transition) {
    const { queryParams } = transition;
    let token = queryParams.token;
    let order = null;

    const loggedIn = this.get('loggedIn');
    const store = this.get('store');
    const organization = this.modelFor('register.community-registration');

    // If a token is present, look up the order.
    // If a token is not present, the order will be created as needed.
    if (isPresent(token)) {
      token = token || this.randomString('order', 128);
      order = store.queryRecord('order', {
        payment_token: token,
        include: 'order_line_items.line_item'
      });
    }

    if (isBlank(order) && loggedIn) {
      order = store.createRecord('order', {
        host: organization,
        user: this.get('currentUser'),
        userName: this.get('currentUser.name'),
        userEmail: this.get('currentUser.email'),
        attendance: this.get('registration')
      });

      order = order.save();
    }

    order
      .catch(error => {
        this.get('flash', error);
        rollbar.error('register community index error', error);
        this.transitionTo('register');
      });

    return RSVP.hash({
      order,
      organization
    });
  }
});
