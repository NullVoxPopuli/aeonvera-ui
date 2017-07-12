import Ember from 'ember';

import {
  invalidateSession
} from 'aeonvera/tests/helpers/ember-simple-auth';

export default Ember.Test.registerAsyncHelper('logout', function(app) {
  invalidateSession(app);
});
