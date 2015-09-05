import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});
/*
  Notes:

  route == verb
  resource == noun

  this.resource('post', function(){
    this.route('comment'); // PostCommentRoute
    this.resource('comment'); // CommentRoute
  });

  index route is automatic
*/
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

    this.resource('event-at-the-door', { path: '/event-at-the-door/:event_id' }, function(){
      this.route('checkin');
      this.route('competition-list');
      this.route('a-la-carte');
    });
    this.resource('events', function() {
      this.route('show', {
        path: ':event_id'
      }, function(){
        /* attendees, volunteers, etc */
      });
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


  /*
    404ish
  */
  this.route('not-found', { path: '/*path' });
});
