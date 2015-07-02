import Ember from 'ember';
// for default redirecting to login, extend the following mixin
// import ApplicationRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';


export default Ember.Route.extend({

  /**
  	Redirect to the welcome route if not logged in.
  */
  beforeModel: function(transition) {
    if (!this.get('session').isAuthenticated) {
      transition.abort();

      // don't show this message, as people just navigating to
      // aeonvera.com would see it.
      // but we want the dashboard to be the default URL
      // Ember.get(this, 'flashMessages').warning(
      // 'You must be logged in to view the dashboard');

      this.transitionTo('welcome');
    }
  },


  model: function() {
    // return this.store.findAll('attended-event');
  }
});
