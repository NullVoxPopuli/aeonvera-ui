import Ember from 'ember';
import SetNavbarTitle from 'aeonvera/mixins/routes/set-navbar-title';

export default Ember.Route.extend(SetNavbarTitle, {
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
