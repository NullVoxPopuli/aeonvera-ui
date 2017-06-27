import Ember from 'ember';
import SetNavBarTitle from 'aeonvera/mixins/routes/set-navbar-title';

const { inject } = Ember;

export default Ember.Route.extend(SetNavBarTitle, {
  i18n: inject.service(),

  model() {
    return this.store.findAll('upcoming-event');
  },

  afterModel() {
    this._setAppNavTitle(this.get('i18n').t('appname'));
  }
});
