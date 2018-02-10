import Route from '@ember/routing/route';
import SetNavbarTitle from 'aeonvera/mixins/routes/set-navbar-title';

export default Route.extend(SetNavbarTitle, {
  model: function(params) {
    const id = params.organization_id;

    const organization = this.store.findRecord('organization', id, {
      include: 'recent_orders'
    });

    return organization;
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
