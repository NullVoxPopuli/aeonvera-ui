import Ember from 'ember';
import { module, test, skip } from 'qunit';
import { withChai } from 'ember-cli-chai/qunit';

import {
  authenticateSession
} from 'aeonvera/tests/helpers/ember-simple-auth';

import moduleForAcceptance from 'aeonvera/tests/helpers/module-for-acceptance';

import startApp from 'aeonvera/tests/helpers/start-app';
import destroyApp from 'aeonvera/tests/helpers/destroy-app';

let eventId = 'testevent';
let userId = 'current-user';
let eventParams = {
  id: eventId,
  name: 'Test Event',
  domain: 'testevent',
  description: 'for testing',
  location: 'ember tests',
  registrationOpensAt: moment().add(1, 'days').toDate()
};

let application;

moduleForAcceptance('Acceptance | Registration | Event | User is Logged In', {
  beforeEach() {
    application = startApp();
    server.logging = true;
    let event = server.create('event', eventParams);

    server.create('user', { email: 'test@test.test', id: 'current-user' });

    server.post('/api/users/sign_in',
      function(schema, request) {
        return this.serialize(schema.users.findBy({ email: request.params.email }));
      }
    );

    authenticateSession(application, {
      email: 'test@test.test',
      token: '123abc'
    });
  },

  afterEach() {
    destroyApp(application);
  }
});

test('can view the registration welcome / not-ready page', assert => {
  visit(`/${eventId}`);

  andThen(() => assert.equal(currentURL(), `/${eventId}/register/${eventId}/not-yet`));
});

skip('does not render form', function(assert) {
  visit(`/${eventId}`);

  andThen(() => {
    const pText = find('p').text();

    assert.notOk(pText.includes('Registration opens at'));
  });
});

// skipped because I can't get ember-cli-mirage to
// server up an event from /api/hosts/:hostId
skip('shows the countdown', withChai(expect => {
  visit(`/${eventId}`);

  andThen(() => {
    console.log('------------', find('*').text());
    let timeTags = find('h2 span').text();

    expect(timeTags).to.include('seconds');
  });
}));

skip('sets registrationIsOpen to true', function(assert) {
  let store = application.get('store');

  Ember.run(() => {
    let event = store.createRecord('event', eventParams);

    assert.notOk(event.get('registrationIsOpen'));

    let yesterday = moment().subtract(1, 'days').toDate();

    event.set('registrationOpensAt', yesterday);

    assert.ok(event.get('registrationIsOpen'));
  });
});

skip('shows the form once the contdown has completed', function(assert) {
  visit(`/${eventId}`);
  andThen(() => {
    let loader = find('.ubuntu-loader');

    assert.ok(Ember.isPresent(loader));

    let store = application.get('store');
    let event = store.peekRecord('event', eventId);
    let yesterday = moment().subtract(1, 'days').toDate();

    event.set('registrationOpensAt', yesterday);
    event.notifyPropertyChange('registrationIsOpen');

    andThen(() => {
      setTimeout(() => {
        let h2s = find('h2');

        assert.ok(h2s.text().includes('Register for Test Event'));
      }, 2000);
    });
  });
});
