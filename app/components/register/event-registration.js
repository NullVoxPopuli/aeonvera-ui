import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),

  // TODO: maybe eventually make requiring to login optional?
  mustLogin: Ember.computed('session.isAuthenticated', function() {
    let authed = this.get('session.isAuthenticated');
    return !authed;
  }),

  title: Ember.computed('model.name', function () {
    return 'Register for ' + this.get('model.name');
  }).readOnly(),

  attendance: function () {
      return this.store.createRecord('event-attendance');
    }.property(),
});
