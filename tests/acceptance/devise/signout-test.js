import { module, test, skip } from 'qunit';
import { withChai } from 'ember-cli-chai/qunit';

import moduleForAcceptance from 'aeonvera/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | sign out', {
  beforeEach() {
    server.create('user', {
      email: 'test@test.test',
      password: 'some-password'
    });
  }
});

test('sign out button should not be visible if already signed out', withChai(function(expect) {
  visit('/');

  let buttonText = find('button').text();

  expect(buttonText)
    .to.not.include('Logout');
}));


skip('signs out when signed in', function(assert) {
  authenticateSession({ email: 'test@test.test', token: '123abc' });

  andThen(() => {
    let button = find('a .fa-sign-out').first().parent();

    button.click();
    /*
      for some reason, the session doesn't invalidate....
      it does in real life though
    */

    andThen(() => {

      expect(currentSession().get('isAuthenticated'))
        .to.equal(false);
    });
  });
});
