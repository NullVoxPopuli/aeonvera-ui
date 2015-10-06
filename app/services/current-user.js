import Ember from 'ember';
import DS from 'ember-data';

const { service } = Ember.inject;

export default Ember.Service.extend({
  session: service('session'),
  store: service(),

  user: Ember.computed('session.data.authenticated.token', function() {
    const token = this.get('session.data.authenticated.token');
    if (!Ember.isEmpty(token)) {
      return DS.PromiseObject.create({
        /*
          the id of 1 here doesn't actually matter,
          the server always returns the current user.
          This is just to route to the show action on the controller.
        */
        promise: this.get('store').find('user', 1)
      });
    }
  })
});
