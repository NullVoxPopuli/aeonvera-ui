import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),

  authenticate: function() {
    var data = this.getProperties('identification', 'password');
    return this.get('session').authenticate('authenticator:devise', data);
  }
});
