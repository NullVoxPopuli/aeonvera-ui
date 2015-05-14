import Ember from 'ember';

export default Ember.Controller.extend({


	// used for showing the button that toggles the menu
	// set by the controller whos route renders the menus
	//
	// all routes' controllers under the root path must set
	// both of these properties
	hasRightMobileMenu: false,
	hasLeftMobileMenu: false,


});
