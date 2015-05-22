import Ember from 'ember';

export default Ember.Component.extend({
	initFoundation: function() {
		this.$(document).foundation();
	}.on('didInsertElement'),

	actions: {
		authenticate: function() {
			var data = this.getProperties('identification', 'password');
			return this.session.authenticate(
				'simple-auth-authenticator:devise',
				data);
		}
	}
});
