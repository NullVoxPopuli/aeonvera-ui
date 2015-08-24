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
    this.route('opensource');
    this.route('privacy');
    this.route('about');
  });

  this.route('dashboard', {
    path: '/'
  }, function() {
    this.route('hosted-events');
    this.route('registered-events');
    this.route('orders');

    this.resource('events', function() {
      this.route('show', { path: ':event_id'});
      this.route('housing-requests', function() {
        this.route('new');
      });
      this.route('housing-provisions', function() {
        this.route('new');
      });

      this.route('checkin', function() {
        this.route('take-payment');
      });
    });

  });

  this.route('register', {
    path: 'r'
  }, function() {
    this.route('level');
    this.route('packages');
  });

  this.route("upcoming-events");
  this.route('communities');

  this.resource('user', function() {
    this.route('edit');
  });

});
