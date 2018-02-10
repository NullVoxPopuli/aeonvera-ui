import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

import SideNav from 'aeonvera/mixins/routes/set-navbar-title';

export default Route.extend(SideNav, {
  i18n: service(),

  activate: function() {
    this.set('title', this.get('i18n').t('upcomingevents'));

    this._super();
  },

  model() {
    return this.store.findAll('upcoming-event');
  },

  afterModel(model) {
    this._hideSideNav();
  }
});
