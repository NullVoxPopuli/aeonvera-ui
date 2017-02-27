import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    const id = this.modelFor('my-communities.manage').get('id');

    return this.store.findRecord('organization', id, {
      adapterOptions: {
        query: {
          include: 'integrations'
        }
      }
    });
  }
});
