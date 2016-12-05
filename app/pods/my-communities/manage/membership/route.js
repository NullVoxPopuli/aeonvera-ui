import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    let id = this.modelFor('my-communities.manage').get('id');
    return this.store.findRecord('organization', id, {
      adapterOptions: {
        query: {
          include: 'membership_options.membership_renewals,membership_discounts',
        },
      },
    });
  },

  setupController(controller, model) {
    this._super(...arguments);

    let org = this.modelFor('my-communities.manage');
    controller.set('organizationId', org.get('id'));
    controller.set('organization', org);
  }
});
