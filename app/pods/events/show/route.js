import Ember from 'ember';
import SetSidebar from 'aeonvera/mixins/routes/set-sidebar';

export default Ember.Route.extend(SetSidebar, {
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

      this.set('title', model.get('name'));

      this._setDashboardSidebar('sidebar/event-sidebar', model);
      this._setMobileLeftMenu('sidebar/event-sidebar');

      // Don't execute parent didTransitions
      return false;
    }
  }
});
