import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { alias } from 'ember-decorators/object/computed';

export default Controller.extend({
  session: service('session'),

  @alias('session.currentUser') currentUser: null,
  @alias('model.upcoming') upcomingEvents: null,
  @alias('model.hosted') upcomingHostedEvents: null
});
