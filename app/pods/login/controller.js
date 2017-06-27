import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  pathStore: Ember.inject.service(),

  actions: {
    didAuthenticate() {
      const pathStore = this.get('pathStore');
      const route = pathStore.getStoredRoute();
      const attemptedTransition = this.get('session.attemptedTransition');

      if (route) return this.transitionToRoute(route);
      if (attemptedTransition) return attemptedTransition.retry();

      this.transitionToRoute('dashboard');
    }
  }
});
