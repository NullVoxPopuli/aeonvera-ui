import Ember from 'ember';

export default Ember.Controller.extend({
	needs: ['application'],

	application: Ember.computed.alias("controllers.application"),

	hasLeftMobileMenu: function() {
		console.log(this.application.get('hasLeftMobileMenu'));
		this.application.get('hasLeftMobileMenu');
	}.property()


});
