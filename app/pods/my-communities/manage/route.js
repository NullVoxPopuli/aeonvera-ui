import Ember from 'ember';
import SetNavbarTitle from 'aeonvera/mixins/routes/set-navbar-title';

export default Ember.Route.extend(SetNavbarTitle, {
  model: function(params) {
    const id = params.organization_id;

    return this.store.findRecord('organization-summary', id, {
      adapterOptions: {
        query: {
          include: 'registrations'
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
