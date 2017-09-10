import Ember from 'ember';
import { test, skip } from 'ember-qunit';
import { withChai } from 'ember-cli-chai/qunit';

import {
  make, makeList, build, buildList,
  mockFindAll, mockFindRecord, mockQuery,
  mockSetup, mockTeardown
} from 'ember-data-factory-guy';

import moduleForAcceptance from 'aeonvera/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | Events | Shirts | Viewing', {
  beforeEach() { mockSetup({ logLevel: 1, mockjaxLogLevel: 4 }); },
  afterEach() { mockTeardown(); }
});

test('a list of shirts', withChai(async expect => {
  authenticateSession();

  const event = make('event');
  const shirts = makeList('shirt', 2);

  mockQuery('shirt').returns({ models: shirts });
  mockFindRecord('event').returns({ model: event });

  await visit(`/dashboard/events/${event.id}/shirts`);

  expect(currentRouteName()).to.equal('events.show.shirts.index');

  const selector = '[data-test-shirts-list]';
  const list = find(selector);

  expect(list).to.be.ok
  expect(list.find('tr').length).to.equal(2);
}));

test('a single shirt with purchases', withChai(async expect => {
  authenticateSession();

  const event = make('event');
  const shirt = make('shirt', 'withPurchases');

  mockFindRecord('shirt').returns({ model: shirt });
  mockFindRecord('event').returns({ model: event });

  await visit(`/dashboard/events/${event.id}/shirts/${shirt.id}`);

  expect(currentRouteName()).to.equal('events.show.shirts.show.index');

  expect(find('tbody tr').length).to.equal(10);
}));
