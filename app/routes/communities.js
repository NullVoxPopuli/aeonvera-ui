import Ember from 'ember';

export default Ember.Route.extend({
  i18n: Ember.inject.service(),

  activate: function () {
    this.set('title', this.get('i18n').t('communities'));

    var application = this.controllerFor('application');
    application.set('mobileMenuLeft', 'nav/dashboard/left-items');
    application.set('mobileMenuRight', 'nav/dashboard/right-items');

    this._super();
  },

  model: function () {
    return this.store.findAll('community');
  },
});
