import Ember from 'ember';

export default Ember.Route.extend({
  // session: Ember.inject.service('session'),

  model: function() {
    let userId = this.get('currentUser.user.id');
    return this.store.query('organization', {
      ownerId: userId
    })
  }
});
