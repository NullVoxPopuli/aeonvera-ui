import Ember from 'ember';

export default Ember.View.extend({ //or Ember.Component.extend

	initFoundation: function() {
		this.$(document).foundation()
	}.on('didInsertElement')

});
