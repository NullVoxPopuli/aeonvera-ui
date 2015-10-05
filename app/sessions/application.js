import Session from 'simple-auth/session';
import Ember from 'ember';
const { computed } = Ember;
const { service } = Ember.inject;

export default Session.extend({
  // store: service(),
  currentUser: computed('secure.token', function(){
    // this.get('store').findRecord('user', this.get('secure.token'));
  })
});
