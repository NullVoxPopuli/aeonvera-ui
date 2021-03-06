import Ember from 'ember';
import { test, skip } from 'ember-qunit';
import { withChai } from 'ember-cli-chai/qunit';

import {
  make, makeList, build,
  mockFindAll, mockFindRecord,
  mockSetup, mockTeardown
} from 'ember-data-factory-guy';

import moduleForAcceptance from 'aeonvera/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | Registration | Event | User is not logged in', {
  beforeEach() { mockSetup({ logLevel: 1, mockjaxLogLevel: 4 }); },
  afterEach() { mockTeardown(); }
});

test('can navigate from upcoming events', withChai(async expect => {
  const upcomingEvents = makeList('upcoming-event', 2);
  const openingTier = make('pricing-tier', { date: new Date(2016, 7) });
  const event = make('event', { openingTier });

  mockFindAll('upcoming-event').returns({ models: upcomingEvents });
  mockFindRecord('event').returns({ model: event });

  const url = `/api/hosts/${event.get('domain')}`;
  const payload = { data: { type: 'events', id: 1, attributes: { id: 1, name: event.get('name') } } };

  Ember.$.mockjax({ url, responseText: payload, type: 'GET' });

  await visit('/upcoming-events');

  const upcomingEvent = upcomingEvents.get(0);
  const linkSelector = `[data-test-upcoming-event-id="${upcomingEvent.id}"] a`;
  const link = find(linkSelector);
  const text = link.text();

  expect(text).to.include(upcomingEvent.get('name'));

  await click(linkSelector);

  expect(currentRouteName()).to.equal('register.event-registration.must-login');
}));
