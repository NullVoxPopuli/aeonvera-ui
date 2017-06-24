import Ember from 'ember';
import SetNavBarTitle from 'aeonvera/mixins/routes/set-navbar-title';

export default Ember.Route.extend(SetNavBarTitle, {
  i18n: Ember.inject.service(),

  model: function() {
    return this.store.findAll('upcoming-event');
  },

  afterModel() {
    this._setAppNavTitle(this.get('i18n').t('appname'));
  }
});
