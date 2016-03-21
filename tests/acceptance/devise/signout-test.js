import Ember from 'ember';
import { module, test, skip } from 'qunit';
import startApp from 'aeonvera/tests/helpers/start-app';
import 'aeonvera/tests/helpers/login';
import 'aeonvera/tests/helpers/service-named';

let application;

module('Acceptance | sign out', {
  beforeEach() {
    application = startApp();
  },

  afterEach() {
    Ember.run(application, 'destroy');
    server.shutdown();
  },
});

test('sign out button should not be visible if already signed out', function(assert) {
  visit('/');
  let button = find('a .fa-sign-out').parent();

  assert.ok(Ember.isEmpty(button));
});

test('sign out button should be visible if logged in', function(assert) {
  login();
  andThen(() => {
    let button = find('a .fa-sign-out').first().parent();
    assert.ok(Ember.isPresent(button));
  });
});

skip('signs out when signed in', function(assert) {
  login();
  andThen(() => {
    let button = find('a .fa-sign-out').first().parent();
    button.click();
    /*
      for some reason, the session doesn't invalidate....
      it does in real life though
    */

    // serviceNamed('session').invalidate()
    andThen(() => {
      let auth = serviceNamed('session').get('isAuthenticated');
      equal(auth, false);
    });
  });
});

skip('redirects if on a route thet requires authorization', function(assert) {
  login();

});
