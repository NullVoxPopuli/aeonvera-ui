import Ember from 'ember';
import SetNavbarTitle from 'aeonvera/mixins/routes/set-navbar-title';

export default Ember.Route.extend(SetNavbarTitle, {
  model: function(params) {
    return this.store.findRecord('event', params.event_id, {
      adapterOptions: {
        query: {
          include: 'opening_tier,integrations,sponsorships'
        }
      }
    });
  },

  actions: {
    didTransition() {
      const model = this.get('currentModel');
      const name = model.get('name');

      this.set('title', name);
      this._setAppNavTitle(name);

      // Don't execute parent didTransitions
      return false;
    }
  }
});
