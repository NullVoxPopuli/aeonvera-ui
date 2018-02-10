import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  session: service(),

  beforeModel() {
    if (this.get('session.isAuthenticated')) {
      return this.transitionTo('register.event-registration');
    }
  },

  model() {
    return this.modelFor('register.event-registration');
  },

  actions: {
    backToRegistration() {
      this.transitionTo('register.event-registration');
    }
  }
});
