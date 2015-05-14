import Ember from 'ember';

export default Ember.Route.extend({
  authenticate: function() {
    var data = this.getProperties('identification', 'password');
    return this.get('session').authenticate(
      'simple-auth-authenticator:devise',
      data);
  }
});
