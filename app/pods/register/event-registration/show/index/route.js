import Route from '@ember/routing/route';
import { isEmpty } from '@ember/utils';

import { service } from 'ember-decorators/service';

import { UNREGISTERED_ID } from 'aeonvera/models/registration';

const PARENT_ROUTE = 'register.event-registration.show';

export default Route.extend({
  @service('flash-notification') flash: null,

  // an unregistered registration cannot view this route
  // (it would be empty, and confusing to a viewer)
  beforeModel(transition) {
    const id = transition.params[PARENT_ROUTE].registrationId;

    if (id === UNREGISTERED_ID) {
      const registration = this.store.peekRecord('users/registration', UNREGISTERED_ID);

      if (isEmpty(registration)) {
        this.transitionTo('register.event-registration.index');
      }
    }
  },

  model() {
    return this.modelFor('register.event-registration.show');
  },

  afterModel(model, transition) {
    // console.log(transition);
    const toReview = transition.intent.name === 'register.event-registration.show.index';
    const hasOrders = model.registration.get('orders.length') > 0;
    // const previousRouteParams = Object.keys(transition.intent.preTransitionState.params);
    // const previousRouteName = previousRouteParams[previousRouteParams.length - 1];

    // const wasOnShow = previousRouteName.includes('register.event-registration.show');

    if (toReview && !hasOrders) {
      this.get('flash').warning('You must add items before you can review your order');

      // if (wasOnShow) return transition.abort();

      this.transitionTo('register.event-registration.show.edit.ticket');
    }
  }
});
