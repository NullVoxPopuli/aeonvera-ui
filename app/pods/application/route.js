import Ember from 'ember';
import RouterScroll from 'ember-router-scroll';

const { inject: { service } } = Ember;

export default Ember.Route.extend(RouterScroll, {
  rollbar: service('rollbar'),
  session: service('session'),
  crisp: service('crisp'),
  headData: service(),
  currentUserService: service('current-user'),
  i18n: service('i18n'),

  // intl: Ember.inject.service(),
  beforeModel: function(transition) {
    const i18n = this.get('i18n');

    this.set('navTitle', i18n.t('appname'));
    this.get('headData').set('title', i18n.t('appname'));

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
    ereror(reason, transition) {
      const errors = reason.errors
      if (errors && errors[0]) {
        const errorObject = new Ember.Object(errors[0]);


        if (errorObject.code === 404) {
          console.warn('404 occurred', reason, transition);
          return;
        }
      }

      this.get('rollbar').error(reason);
    },

    resetState() {
      this.refresh();
    },

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
