import { registerAsyncHelper } from '@ember/test';

import {
  invalidateSession
} from 'aeonvera/tests/helpers/ember-simple-auth';

export default registerAsyncHelper('logout', function(app) {
  invalidateSession(app);
});
