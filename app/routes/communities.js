import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  i18n: service(),

  activate: function() {
    this.set('title', this.get('i18n').t('communities'));

    const application = this.controllerFor('application');

    application.set('mobileMenuLeft', 'nav/dashboard/left-items');
    application.set('mobileMenuRight', 'nav/dashboard/right-items');

    this._super();
  },

  model: function() {
    return this.store.findAll('organization');
  }
});
