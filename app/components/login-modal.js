import Ember from 'ember';

export default Ember.Component.extend({
	session: Ember.inject.service('session'),

	initFoundation: function() {
		Ember.$(document).foundation('reflow');
	}.on('didInsertElement'),

	actions: {
		authenticate: function() {
			var data = this.getProperties('identification', 'password');
			return this.session.authenticate('authenticator:devise', data);
		}
	}
});
