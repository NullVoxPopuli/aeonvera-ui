import Ember from 'ember';
import SideNav from 'aeonvera/mixins/routes/set-navbar-title';

export default Ember.Route.extend(SideNav, {
  i18n: Ember.inject.service(),

  activate: function() {
    this.set('title', this.get('i18n').t('upcomingevents'));

    this._super();
  },

  model: function() {
    return this.store.findAll('upcoming-event');
  },

  afterModel() {
    this._hideSideNav();
  }
});
