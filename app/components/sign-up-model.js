import Ember from 'ember';

export default Ember.Component.extend({
	initFoundation: function() {
		this.$(document).foundation();
	}.on('didInsertElement')
});
