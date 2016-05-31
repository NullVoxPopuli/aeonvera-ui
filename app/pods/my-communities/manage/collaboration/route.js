import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    let id = this.modelFor('my-communities.manage').get('id');
    let type = 'Organization';

    return this.store.query('collaboration', {
      host_id: id,
      host_type: type
    });
  },

  actions: {
    invite(email) {

    }
  }
});
