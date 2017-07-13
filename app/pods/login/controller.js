import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  pathStore: Ember.inject.service(),

  actions: {
    didAuthenticate() {
      // just in case, switching users
      this.get('store').unloadAll();

      const pathStore = this.get('pathStore');
      const route = pathStore.getStoredRoute();
      const attemptedTransition = this.get('session.attemptedTransition');

      if (route) return this.transitionToRoute(route);

      const useAttemptedTransition = (
        attemptedTransition && !attemptedTransition.targetName.includes('login')
      );

      if (useAttemptedTransition) return attemptedTransition.retry();

      this.transitionToRoute('dashboard');
    }
  }
});
