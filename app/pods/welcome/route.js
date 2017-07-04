import Ember from 'ember';
import SideNav from 'aeonvera/mixins/routes/set-navbar-title';

// import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
// UnauthenticatedRouteMixin,
export default Ember.Route.extend(SideNav, {
  i18n: Ember.inject.service(),

  sessionAuthenticated() {
    this.transitionTo('dashboard');
  },

  afterModel() {
    this._hideSideNav();
  }

});
