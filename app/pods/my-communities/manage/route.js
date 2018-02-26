import Route from '@ember/routing/route';

export default Route.extend({
  navbarTitle: service('navbar-title'),

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

      this.get('navbarTitle').setTitle(name);

      // Don't execute parent didTransitions
      return false;
    }
  }
});
