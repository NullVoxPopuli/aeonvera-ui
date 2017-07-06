// example link
// https://aeonvera.com/confirmation?confirmation_token=b808ff2de64853c3b46a0ebbaa14360f086389d368e3b122f864bc22878a2561
// TODO: come up with a way to migrate to auth0?
import Ember from 'ember';
import { test, skip } from 'ember-qunit';
import { withChai } from 'ember-cli-chai/qunit';

import moduleForAcceptance from 'aeonvera/tests/helpers/module-for-acceptance';

import startApp from 'aeonvera/tests/helpers/start-app';
import destroyApp from 'aeonvera/tests/helpers/destroy-app';

let application;

moduleForAcceptance('Acceptance | Email Confirmation', {
  beforeEach() {
    application = startApp();

    server.get('/api/confirmation', (schema, request) => ({ }));

    server.logging = true;
  },

  afterEach() {
    destroyApp(application);
  }
});


skip('visits the confirm-link', withChai(expect => {
  visit('/confirmation?confirmation_token=123');

  andThen(() => {
    expect(currentRouteName()).to.equal('confirmation.success');
  });
}));

skip('transitions to dashboard if logged in', withChai(expect => {
  expect(0);
}));
