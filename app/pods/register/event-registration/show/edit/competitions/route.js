import Route from '@ember/routing/route';
import { isBlank } from '@ember/utils';
import moment from 'moment';

export default Route.extend({
  // event, registration
  model(params) {
    return this.modelFor('register.event-registration.show');
  },

  afterModel(model) {
    const event = model.event;

    const hasCompetitions = event.get('competitions.length') > 0;
    const unpaidOrder = model.registration.get('unpaidOrder');

    const shouldSkipThisPage = (
      !hasCompetitions || isBlank(unpaidOrder)
    );

    if (shouldSkipThisPage) {
      this.transitionTo('register.event-registration.show');
    }
  }
});
