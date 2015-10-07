import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  openLogin: function(){
    Ember.$(document).foundation('reflow');

    Ember.$('#login-modal').foundation('reveal', 'open');
    // Ember.$('a[data-reveal-id="login-modal"]').click();
  }.on('didInsertElement')
});
