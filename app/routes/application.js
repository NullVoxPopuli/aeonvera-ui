import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
	currentUser: Ember.inject.service(),

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

		sessionAuthenticationSucceeded: function() {
			jQuery('a.close-reveal-modal').trigger('click');
			this.transitionTo('dashboard');
			Ember.get(this, 'flashMessages').success(
				'You have successfully logged in');
		},

		sessionAuthenticationFailed: function(error) {
			Ember.get(this, 'flashMessages').warning(error.error || error);
		}

	}
});
