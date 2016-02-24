import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    let id = this.modelFor('my-communities.manage').get('id');
    return this.store.findRecord('organization', id, {
      adapterOptions: {
        query: {
          include: 'membership_options,membership_discounts',
        },
      },
    });
  },
});
