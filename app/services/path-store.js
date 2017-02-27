import Ember from 'ember';

export default Ember.Service.extend({
  localSettings: Ember.inject.service('local-settings'),

  storeCurrentRoute() {
    const path = window.location.pathname;
    const localSettings = this.get('localSettings');

    localSettings.setValue('redirect-path', path);
  },

  getStoredRoute() {
    const localSettings = this.get('localSettings');

    return localSettings.getValue('redirect-path');
  },

  clearStoredRoute() {
    const localSettings = this.get('localSettings');

    localSettings.setValue('redirect-path', null);
  },

  redirectIfPathIsPresent() {
    const route = this.getStoredRoute();
    const currentPath = window.location.pathname;

    if (route === currentPath) {
      this.clearStoredRoute();
      return;
    }

    if (Ember.isPresent(route)) {
      // This forces a browser redirect... boo.
      this.clearStoredRoute();
      window.location.pathname = route;
    }

    // else, do nothing... we don't want to interrupt
    // the normal loading of the app
  }
});
