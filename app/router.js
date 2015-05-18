import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
	location: config.locationType
});

export default Router.map(function() {
	this.route('login');
	this.route('signup');
	this.resource('welcome', function() {
		this.route('features');
		this.route('pricing');
		this.route('faq');
		this.route('tos', function() {
			this.route('organizers');
			this.route('non-organizers');
			this.route('updates');
		});
		this.route('privacy');
		this.route('about');
	});
	this.resource('events', function() {});

	this.route('dashboard', {
		path: '/'
	});

});
