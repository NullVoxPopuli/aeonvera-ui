import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  // beforeModel(transition) {
  //   if (this.get('session').get('isAuthenticated')) {
  //     transition.abort();
  //     Ember.assert('The route configured as Configuration.routeIfAlreadyAuthenticated cannot implement the UnauthenticatedRouteMixin mixin as that leads to an infinite transitioning loop!', this.get('routeName') !== Configuration.routeIfAlreadyAuthenticated);
  //     this.transitionTo(Configuration.routeIfAlreadyAuthenticated);
  //   } else {
  //     return this._super(...arguments);
  //   }

  actions: {
    authenticate: function() {
      var data = this.getProperties('identification', 'password');
      return this.get('session').authenticate('authenticator:devise', data);
    }
  }
});
