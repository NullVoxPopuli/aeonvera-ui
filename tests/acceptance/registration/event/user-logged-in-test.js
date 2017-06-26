import Ember from 'ember';
import { module, test, skip } from 'qunit';
import { withChai } from 'ember-cli-chai/qunit';

import {
  authenticateSession
} from 'aeonvera/tests/helpers/ember-simple-auth';

import moduleForAcceptance from 'aeonvera/tests/helpers/module-for-acceptance';

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
moduleForAcceptance('Acceptance | Registration | Event | User is Logged In', {
  beforeEach() {

    let event = server.create('event', eventParams);

    authenticateSession(this.application, {
      email: 'test@test.test'
    });
  }
});

test('can view the registration page', assert => {
  visit(`/${eventId}`);
  andThen(() => assert.equal(currentURL(), `/${eventId}`));
});

test('does not render form', assert => {
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
  let store = this.application.get('store');

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

    let store = this.application.get('store');
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
