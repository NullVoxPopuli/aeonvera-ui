import Ember from 'ember';
import AuthenticatedUi from '../mixins/authenticated-ui';
import SetSidebar from 'aeonvera/mixins/routes/set-sidebar';

export default Ember.Route.extend(AuthenticatedUi, SetSidebar, {
  i18n: Ember.inject.service(),

  beforeModel() {
    this._super(...arguments);
    Ember.run.later(() => {
      this.set('title', this.get('i18n').t('dashboard'));

      this._setDashboardSidebar('sidebar/dashboard-sidebar');
      this._setMobileLeftMenu('sidebar/dashboard-sidebar');
    });
  },

  actions: {
    setSidebar(name) {
      var dashboard = this.controllerFor('dashboard');
      dashboard.set('sidebar', name);
    },

    setData: function (data) {
      var dashboard = this.controllerFor('dashboard');
      dashboard.set('data', data);
    },
  },

});
