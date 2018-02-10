import { test, skip } from 'ember-qunit';
import { withChai } from 'ember-cli-chai/qunit';

import moduleForAcceptance from 'aeonvera/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | Email Confirmation', {
  beforeEach() {
    server.get('/api/confirmation', (schema, request) => ({ }));

    server.logging = true;
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
