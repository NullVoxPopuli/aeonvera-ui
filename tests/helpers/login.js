import Ember from 'ember';

export default Ember.Test.registerAsyncHelper('login', function(app, assert) {
  server.create('user');

  let session = app.__container__.lookup('service:session');
  let auth = session.get('isAuthenticated');
  equal(auth, false);

  visit('/');
  click('.auth-link a.button.login');

  let loginModalSelector = '.reveal-modal[data-name="login-modal"]';
  andThen(() => {
    let text = find(
      loginModalSelector + ' h2').first().text();
    equal(text, 'Login');
  });

  fillIn(loginModalSelector + ' input[type="text"]', 'test@test.test');
  fillIn(loginModalSelector + ' input[type="password"]', 'some-password');

  click(loginModalSelector + ' button[type="submit"]');

  andThen(() => {
    let session = app.__container__.lookup('service:session');
    let auth = session.get('isAuthenticated');
    equal(auth, true);
  });
});
