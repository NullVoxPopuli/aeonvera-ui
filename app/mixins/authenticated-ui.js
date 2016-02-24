import Ember from 'ember';

//import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
// AuthenticatedRouteMixin,
export default Ember.Mixin.create({
  session: Ember.inject.service('session'),

  activate: function () {
    var application = this.controllerFor('application');
    application.set('mobileMenuLeft', 'nav/dashboard/left-items');
    application.set('mobileMenuRight', 'nav/dashboard/right-items');

    this._super();
  },

  /**
  	Redirect to the welcome route if not logged in.
  */
  beforeModel: function (transition) {
    if (!this.get('session.isAuthenticated')) {
      transition.abort();

      // don't show this message, as people just navigating to
      // aeonvera.com would see it.
      // but we want the dashboard to be the default URL
      // Ember.get(this, 'flashMessages').warning(
      // 'You must be logged in to view the dashboard');
      this.transitionTo('welcome');

    }

    this._super();
  },
});
