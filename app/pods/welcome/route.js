import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import SideNav from 'aeonvera/mixins/routes/set-navbar-title';

// import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
// UnauthenticatedRouteMixin,
export default Route.extend(SideNav, {
  i18n: service(),

  sessionAuthenticated() {
    this.transitionTo('dashboard');
  },

  afterModel() {
    this._hideSideNav();
  }

});
