import Ember from 'ember';

export default Ember.Route.extend({

	hasRightMobileMenu: false,
	hasLeftMobileMenu: false,

	setRightMobileMenu: function() {
		// renders the aside for the foundation off-canvas
	},

	setLeftMobileMenu: function() {

	},

	actions: {
		linkToRoute: function(item) {
			this.transitionTo(item.route);
		}
	}
});
