import Ember from 'ember';
import AuthenticatedUi from 'aeonvera/mixins/authenticated-ui';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import SideNav from 'aeonvera/mixins/routes/set-navbar-title';

export default Ember.Route.extend(AuthenticatedUi, AuthenticatedRouteMixin, SideNav, {
  i18n: Ember.inject.service(),
  authenticationRoute: 'login',

  afterModel() {
    this._showSideNav();
  }

});
