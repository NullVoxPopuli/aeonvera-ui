import Ember from 'ember';
import SetSidebar from 'aeonvera/mixins/routes/set-sidebar';

export default Ember.Route.extend(SetSidebar, {
  model: function(params) {
    const id = params.organization_id;

    return this.store.findRecord('organization-summary', id, {
      adapterOptions: {
        query: {
          include: 'attendances'
        }
      }
    });
  },

  actions: {
    didTransition() {
      const model = this.get('currentModel');

      this.set('title', model.get('name'));

      this._setDashboardSidebar('sidebar/community-sidebar', model);
      this._setMobileLeftMenu('sidebar/community-sidebar', model);

      // Don't execute parent didTransitions
      return false;
    }
  }
});
