import Ember from 'ember';

export default Ember.Route.extend({

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
			this.transitionTo('signup')
		}

	}
});
