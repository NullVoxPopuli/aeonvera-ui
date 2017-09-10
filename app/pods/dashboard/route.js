import Ember from 'ember';
import AuthenticatedUi from 'aeonvera/mixins/authenticated-ui';
import SideNav from 'aeonvera/mixins/routes/set-navbar-title';

export default Ember.Route.extend(AuthenticatedUi, SideNav, {
  i18n: Ember.inject.service(),

  afterModel() {
    this._showSideNav();
  }

});
