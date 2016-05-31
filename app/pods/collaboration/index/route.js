import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    acceptSuccess() {
      this.transitionTo('collaboration.success');
    }
  }
});
