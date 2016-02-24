/**
  Configures a registry with injections on Ember applications
  for the Ember-Data store. Accepts an optional namespace argument.
  @method initializeStoreInjections
  @param {Ember.Registry} registry
*/
export default {
  initialize: function (registry) {
    // registry.injection for Ember < 2.1.0
    // application.inject for Ember 2.1.0+
    var inject = registry.inject || registry.injection;
    inject.call(registry, 'controller', 'currentUser', 'service:currentUser');
    inject.call(registry, 'route', 'currentUser', 'service:currentUser');
    inject.call(registry, 'component', 'currentUser', 'service:currentUser');
  },
};
