import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';


export default Ember.Route.extend(ApplicationRouteMixin, {
  init: function() {
    if (!this.get('session').isAuthenticated) {
      Ember.get(this, 'flashMessages').warning(
        'You must be logged in to view the dashboard');
      this.transitionTo('welcome');
    }

  },

  model: function() {
    return this.store.findAll('attended-event');
  }
});
