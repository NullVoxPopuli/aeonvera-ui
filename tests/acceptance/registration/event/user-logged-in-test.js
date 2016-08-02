import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'aeonvera/tests/helpers/start-app';
import { currentSession, authenticateSession, invalidateSession } from 'aeonvera/tests/helpers/ember-simple-auth';
import 'aeonvera/tests/helpers/service-named';

let application;

// fake mocha
let it = test;
let describe = function(name, tests) {
  tests();
};

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
module('Acceptance | Registration | Event | User is Logged In', {
  beforeEach() {
    application = startApp();

    let event = server.create('event', eventParams);

    // server.logging=true;
    let user = server.create('user', { id: userId });

    authenticateSession(application, {
      email: user.email,
      id: user.id,
      token: user.token
    });
  },

  afterEach() {
    Ember.run(application, 'destroy');
    server.shutdown();
  },
});

it('can view the registration page', assert => {
  visit(`/${eventId}`);
  andThen(() => assert.equal(currentURL(), `/${eventId}`));
});

describe('Event has not yet started', function() {
  it('does not render form', assert => {
    visit(`/${eventId}`);
    andThen(() => {
      let h2s = find('h2');
      assert.notOk(h2s.text().includes('Register for Test Event'));
    });
  });

  it('shows the countdown', assert => {
    visit(`/${eventId}`);
    andThen(() => {
      let h4s = find('h4');
      let loader = find('.ubuntu-loader');

      assert.ok(h4s.text().includes('ember tests'));
      assert.ok(Ember.isPresent(loader));
    });
  });

  it('sets registrationIsOpen to true', assert => {
    let store = serviceNamed('store');

    Ember.run(() => {
      let event = store.createRecord('event', eventParams);
      assert.notOk(event.get('registrationIsOpen'));

      let yesterday = moment().subtract(1, 'days').toDate();
      event.set('registrationOpensAt', yesterday);

      assert.ok(event.get('registrationIsOpen'));
    });
  });

  it('shows the form once the contdown has completed', assert => {
    visit(`/${eventId}`);
    andThen(() => {
      let loader = find('.ubuntu-loader');
      assert.ok(Ember.isPresent(loader));

      let store = serviceNamed('store');
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
});

describe('Event has started', function() {
  describe('housing', function() {

  });

  describe('custom fields', function() {

  });

  describe('competitions', function() {

  });

  describe('shirts', function() {

  });

  describe('a la carte', function() {

  });
});
