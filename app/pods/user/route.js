import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import AuthenticatedUi from 'aeonvera/mixins/authenticated-ui';
import SideNav from 'aeonvera/mixins/routes/set-navbar-title';

export default Route.extend(AuthenticatedUi, SideNav, {
  i18n: service(),

  afterModel() {
    this._showSideNav();
  }

});
