import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.findRecord('event', params.event_id, {
      include: 'shirts,integrations,competitions,line_items,discounts'
    });
  },

  actions: {
    didTransition() {
      const model = this.get('currentModel');
      this.set('title', model.get('name'));

      this._setDashboardSidebar('sidebar/event-at-the-door-sidebar', model);
      this._setMobileLeftMenu('sidebar/event-at-the-door-sidebar');

      // Don't execute parent didTransitions
      return false;
    }
  }
});
