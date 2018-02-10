import Route from '@ember/routing/route';

export default Route.extend({
  actions: {
    acceptSuccess() {
      this.transitionTo('collaboration.success');
    }
  }
});
