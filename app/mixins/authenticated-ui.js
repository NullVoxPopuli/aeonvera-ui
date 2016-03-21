import Ember from 'ember';

import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Mixin.create(AuthenticatedRouteMixin, {
  session: Ember.inject.service('session'),
  flashMessages: Ember.inject.service('flashMessages'),

  activate: function () {
    var application = this.controllerFor('application');
    application.set('mobileMenuLeft', 'nav/dashboard/left-items');
    application.set('mobileMenuRight', 'nav/dashboard/right-items');

    this.get('session').on('invalidationSucceeded', () => {
      let msg = 'You have logged out successfully.';
      this.get('flashMessages').success(msg);
      this.transitionTo('welcome');
    });
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
  }
});
