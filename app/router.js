import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.resource('welcome', { path: '/'}, function(){
    this.route('features');
    this.route('pricing');
    this.route('faq');
    this.route('tos');
    this.route('privacy');
  });
  this.resource('events', function() {});
});
