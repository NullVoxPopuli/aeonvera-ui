import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  actions: {
    authenticate: function() {
      const data = this.getProperties('identification', 'password');

      return this.get('session').authenticate('authenticator:token', data);
    }
  }
});
