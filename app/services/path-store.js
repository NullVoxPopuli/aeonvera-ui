import Ember from 'ember';

export default Ember.Service.extend({
  localSettings: Ember.inject.service('local-settings'),

  storeCurrentRoute(){
    let path = window.location.pathname;
    let localSettings = this.get('localSettings');

    localSettings.setValue('redirect-path', path);
  },

  getStoredRoute(){
    let localSettings = this.get('localSettings');
    return localSettings.getValue('redirect-path');
  },

  clearStoredRoute(){
    let localSettings = this.get('localSettings');
    localSettings.setValue('redirect-path', null);
  },

  redirectIfPathIsPresent(){
    let route = this.getStoredRoute();
    let currentPath = window.location.pathname;

    if (route === currentPath){
      this.clearStoredRoute();
      return;
    }

    if (Ember.isPresent(route)){
      // This forces a browser redirect... boo.
      this.clearStoredRoute();
      window.location.pathname = route;
    }

    // else, do nothing... we don't want to interrupt
    // the normal loading of the app
  }
});
