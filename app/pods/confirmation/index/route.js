import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    confirmationSuccess() {
      this.transitionTo('confirmation.success');
    }
  }
});
