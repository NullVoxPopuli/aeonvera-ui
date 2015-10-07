import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Component.extend({
	session: service('session'),

	initFoundation: function() {
		Ember.$(document).foundation('reflow');
	}.on('didInsertElement'),

	actions: {
		authenticate: function() {
			var data = this.getProperties('identification', 'password');
			return this.get('session').authenticate('authenticator:devise', data);
		}
	}
});
