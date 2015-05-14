import Ember from 'ember';

export default Ember.Route.extend({

	actions: {
		linkToRoute: function(item) {
			this.transitionTo(item.route);
		},

		setMobileMenuProperties: function() {
			// tell the application what our mobile navigation will look like
			this.controller.set('hasLeftMobileMenu', true);
			this.controller.set('hasRightMobileMenu', true);

		}


	}
});
