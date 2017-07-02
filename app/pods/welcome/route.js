import Ember from 'ember';

// import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
// UnauthenticatedRouteMixin,
export default Ember.Route.extend({
  i18n: Ember.inject.service(),

  sessionAuthenticated() {
    this.transitionTo('dashboard');
  }

});
