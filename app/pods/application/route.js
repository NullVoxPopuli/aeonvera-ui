import Ember from 'ember';
import ResetScroll from 'aeonvera/mixins/routes/reset-scroll';
import SetSidebar from 'aeonvera/mixins/routes/set-sidebar';

const { inject: { service } } = Ember;

export default Ember.Route.extend(ResetScroll, SetSidebar, {
  session: service('session'),
  currentUserService: service('current-user'),
  pathStore: service('path-store'),
  i18n: service('i18n'),

  // intl: Ember.inject.service(),
  beforeModel: function(transition) {
    this.set('navTitle', this.get('i18n').t('appname'));

    // post-email-confirmation
    this.get('pathStore').redirectIfPathIsPresent();

    // general post-login redirect
    if (transition.targetName !== 'login') {
      this.set('session.attemptedTransition', transition);
    }

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
