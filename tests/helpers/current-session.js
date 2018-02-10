import { registerHelper } from '@ember/test';

import {
  currentSession
} from 'aeonvera/tests/helpers/ember-simple-auth';

export default registerHelper('currentSession', function(app) {
  return currentSession(app);
});
