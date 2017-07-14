import Ember from 'ember';
import { test, skip } from 'ember-qunit';
import { withChai } from 'ember-cli-chai/qunit';
import testSelector from 'ember-test-selectors';

import {
  make, makeList,
  mockFindAll, mockFindRecord,
  mockSetup, mockTeardown
} from 'ember-data-factory-guy';

import moduleForAcceptance from 'aeonvera/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | Registration | Event | User is not logged in', {
  beforeEach() {
    mockSetup({ logLevel: 1, mockjaxLogLevel: 4 });

  },
  afterEach() { mockTeardown(); }
});

skip('can navigate from upcoming events', withChai(expect => {
  const upcomingEvents = makeList('upcoming-event', 2);
  const event = make('event');
  const host = make('host', { id: event.domain });

  mockFindAll('upcoming-event').returns({ models: upcomingEvents });
  mockFindRecord('event').returns({ model: event });
  mockFindRecord('host').returns({ model: host });

  visit('/upcoming-events');

  andThen(() => {
    const upcomingEvent = upcomingEvents.get(0);
    const linkSelector = testSelector('upcoming-event-id', upcomingEvent.id);
    const link = find(linkSelector);
    const text = link.text();

    expect(text).to.include(upcomingEvent.get('name'));

    click(linkSelector);

    andThen(() => expect(currentRouteName()).to.equal('register.event-registration.must-login'));
  });
}));
