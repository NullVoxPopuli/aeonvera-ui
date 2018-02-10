import Route from '@ember/routing/route';
import SetNavbarTitle from 'aeonvera/mixins/routes/set-navbar-title';

export default Route.extend(SetNavbarTitle, {
  model: function(params) {
    return this.store.findRecord('event', params.event_id, {
      include: 'opening_tier,current_tier,integrations,sponsorships'
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
