import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    const summary = this.modelFor('my-communities.manage');
    const id = summary.get('id');

    return this.store.findRecord('organization', id);
  }
});
