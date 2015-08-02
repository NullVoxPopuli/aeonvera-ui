import Ember from 'ember';
import User from '../app/models/user.js';

export default Ember.Component.extend({
	initFoundation: function() {
		this.$(document).foundation('reflow');
	}.on('didInsertElement'),

	actions: {
		register: function(data) {
			User.createRecord({
				firstName: this.get('firstName'),
				lastName: this.get('lastName'),
				email: this.get('email'),
				password: this.get('password'),
				passwordConfirmation: this.get('passwordConfirmation')
			});
		}
	}
});
