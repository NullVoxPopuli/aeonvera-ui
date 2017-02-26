import Ember from 'ember';
const { isPresent } = Ember;

export default Ember.Mixin.create({
  _setDashboardSidebar(name, data = null) {
    const dashboard = this.controllerFor('dashboard');
    dashboard.set('sidebar', name);
    dashboard.set('data', data);
  },

  _setMobileLeftMenu(name, data = null) {
    const application = this.controllerFor('application');
    application.set('mobileMenuLeft', name);
    application.set('mobileModelLeft', data);
  },

  _clearMobileLeftMenu() {
    const application = this.controllerFor('application');
    application.set('mobileModelLeft', null);
    application.set('mobileMenuLeft', null);
  },

  _setMobileRightMenu() {

  },
});
