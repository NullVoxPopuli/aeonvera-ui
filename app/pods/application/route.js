import Ember from 'ember';
import ResetScroll from 'aeonvera/mixins/routes/reset-scroll';
import SetSidebar from 'aeonvera/mixins/routes/set-sidebar';

export default Ember.Route.extend(ResetScroll, SetSidebar, {
  session: Ember.inject.service('session'),
  currentUserService: Ember.inject.service('current-user'),
  pathStore: Ember.inject.service('path-store'),

  // intl: Ember.inject.service(),
  beforeModel: function(transition) {
    // post-email-confirmation
    this.get('pathStore').redirectIfPathIsPresent();

    // Make sure the current user is loaded before anything else.
    if (this.get('session.isAuthenticated')) {
      this.get('currentUserService.user');
    }
  },

  actions: {

    passwordReset() {
      Ember.$('.close-reveal-modal').click();
      this.transitionTo('password-reset');
    },

    newConfirmation() {
      Ember.$('.close-reveal-modal').click();
      this.transitionTo('confirmation.new');
    },

    linkToRoute: function(item) {
      this.transitionTo(item.route);
    },

    exitOffCanvas: function() {
      this.$('a.exit-off-canvas').click();
    },

    redirectToLogin: function() {
      this.transitionTo('login');
    },

    redirectToSignup: function() {
      this.transitionTo('signup');
    },

    linkToDashboard() {
      this._setMobileLeftMenu('sidebar/dashboard-sidebar');
      this.transitionTo('dashboard');
    },

    invalidateSession: function() {
      this.get('session').invalidate();
    },

    transitionToLoginRoute: function() {
      //  this.transitionTo('login');
      this.transitionTo('welcome');
    }

  }
});
