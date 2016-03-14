import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    let id = this.modelFor('my-communities.manage').get('id');
    return this.store.findRecord('community', id, {
      adapterOptions: {
        query: {
          include: 'integrations',
        },
      },
    });
  },
});
