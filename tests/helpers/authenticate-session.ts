import Ember from 'ember';

import {
  authenticateSession
} from 'aeonvera/tests/helpers/ember-simple-auth';

declare global {
  export const authenticateSession: typeof authenticateSession;
}

export default Ember.Test.registerAsyncHelper('authenticateSession', function(app, data) {
  authenticateSession(app, data);
});
