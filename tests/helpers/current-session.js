import Ember from 'ember';

import {
  currentSession
} from 'aeonvera/tests/helpers/ember-simple-auth';

export default Ember.Test.registerHelper('currentSession', function(app) {
  return currentSession(app);
});
