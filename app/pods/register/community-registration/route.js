import Route from '@ember/routing/route';
import SetNavbarTitle from 'aeonvera/mixins/routes/set-navbar-title';

export default Route.extend(SetNavbarTitle, {
  model(params) {
    return this.store.findRecord('organization', params.id);
  },

  actions: {
    didTransitions() {
      this._setAppNavTitleFromModelName();
      return false;
    }
  }
});
