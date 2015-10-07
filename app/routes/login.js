import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  actions: {
    authenticate: function() {
      var data = this.getProperties('identification', 'password');
      return this.get('session').authenticate('authenticator:devise', data);
    }
  }
});
