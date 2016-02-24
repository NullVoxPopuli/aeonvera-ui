import Ember from 'ember';

export default Ember.Route.extend({
  redirect: function () {
    localStorage.clear();
    this.transitionTo('welcome');
  },
});
