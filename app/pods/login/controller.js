import Ember from 'ember';

export default Ember.Controller.extend({
  pathStore: Ember.inject.service(),

  actions: {
    didAuthenticate() {
      const pathStore = this.get('pathStore');
      const route = pathStore.getStoredRoute();

      if (route) return this.transitionToRoute(route);

      this.transitionToRoute('dashboard');
    }
  }
});
