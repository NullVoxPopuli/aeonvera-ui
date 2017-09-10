import Ember from 'ember';
import { alias } from 'ember-decorators/object/computed';

const { inject } = Ember;

export default Ember.Controller.extend({
  session: inject.service('session'),

  @alias('session.currentUser') currentUser: null,
  @alias('model.upcoming') upcomingEvents: null,
  @alias('model.hosted') upcomingHostedEvents: null
});
