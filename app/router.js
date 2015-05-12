import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.resource('welcome', { path: '/'});
  this.route('features');
  this.route('faq');
  this.resource('events', function() {});
});
