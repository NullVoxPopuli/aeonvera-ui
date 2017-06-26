import Ember from 'ember';
import { expect } from 'chai';

import {
  currentSession
} from 'aeonvera/tests/helpers/ember-simple-auth';

export default Ember.Test.registerAsyncHelper('login', function(app, assert) {

  let auth = currentSession(app).get('isAuthenticated');
  expect(auth)
    .to.equal(false);

  visit('/login');


  fillIn('input[type="text"]', 'test@test.test');
  fillIn('input[type="password"]', 'some-password');

  click('button[type="submit"]');

  andThen(() => {
    let auth = currentSession(app).get('isAuthenticated');

    expect(auth)
      .to.equal(true);
  });
});
