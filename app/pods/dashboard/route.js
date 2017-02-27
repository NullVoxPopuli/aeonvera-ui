import Ember from 'ember';
import AuthenticatedUi from 'aeonvera/mixins/authenticated-ui';
import SetSidebar from 'aeonvera/mixins/routes/set-sidebar';

export default Ember.Route.extend(AuthenticatedUi, SetSidebar, {
  i18n: Ember.inject.service(),

  // reset to defaults upon navigation
  willTransition() {
    this._super(...arguments);
    this._setDashboardSidebar('sidebar/dashboard-sidebar');
    this._setMobileLeftMenu('sidebar/dashboard-sidebar');
  },

  actions: {
    didTransition() {
      this.set('title', this.get('i18n').t('dashboard'));
      this._setDashboardSidebar('sidebar/dashboard-sidebar');
      this._setMobileLeftMenu('sidebar/dashboard-sidebar');
      return true;
    }
  }

});
