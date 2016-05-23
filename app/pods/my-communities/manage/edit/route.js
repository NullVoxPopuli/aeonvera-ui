import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    let summary = this.modelFor('my-communities.manage');
    let id = summary.get('id');
    return this.store.findRecord('organization', id);
  }
});
