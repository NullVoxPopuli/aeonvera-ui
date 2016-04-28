import Ember from 'ember';

export default Ember.Route.extend({
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

  // http://stackoverflow.com/questions/12150624/ember-js-multiple-named-outlet-usage
  renderTemplate: function() {

    // Render default outlet
    this.render();

    // render footer
    this.render('shared/footer', {
      outlet: 'bottom-footer',
      into: 'application',
    });

  },

  actions: {

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

    invalidateSession: function() {
      this.get('session').invalidate();
    },

    transitionToLoginRoute: function() {
      //  this.transitionTo('login');
      this.transitionTo('welcome');
    },

  },
});
