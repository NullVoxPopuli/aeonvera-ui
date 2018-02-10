import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    const summary = this.modelFor('my-communities.manage');
    const id = summary.get('id');

    return this.store.findRecord('organization', id);
  }
});
