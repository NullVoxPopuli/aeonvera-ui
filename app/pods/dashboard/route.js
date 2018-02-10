import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import AuthenticatedUi from 'aeonvera/mixins/authenticated-ui';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import SideNav from 'aeonvera/mixins/routes/set-navbar-title';

export default Route.extend(AuthenticatedUi, AuthenticatedRouteMixin, SideNav, {
  i18n: service(),
  authenticationRoute: 'login',

  afterModel() {
    this._showSideNav();
  }

});
