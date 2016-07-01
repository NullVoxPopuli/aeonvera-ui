import Ember from 'ember';
const { isPresent } = Ember;

export default Ember.Mixin.create({
  _setDashboardSidebar(name, data = null) {
    let dashboard = this.controllerFor('dashboard');
    dashboard.set('sidebar', name);

    if (isPresent(data)) {
      dashboard.set('data', data);
    }
  },

  _setMobileLeftMenu(name, data = null) {
    let application = this.controllerFor('application');
    application.set('mobileMenuLeft', name);

    if (isPresent(data)) {
      application.set('mobileModelLeft', data);
    }
  },

  _clearMobileLeftMenu() {
    let application = this.controllerFor('application');
    application.set('mobileModelLeft', null);
    application.set('mobileMenuLeft', null);
  },

  _setMobileRightMenu() {

  },
});
