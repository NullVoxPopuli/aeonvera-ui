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

test('a list of packages', withChai(async expect => {
  authenticateSession();

  const event = make('event');
  const packages = makeList('package', 2);

  mockQuery('package').returns({ models: packages });
  mockFindRecord('event').returns({ model: event });

  await visit(`/events/${event.id}/packages`);

  expect(currentRouteName()).to.equal('events.show.packages.index');

  expect(find('tbody tr').length).to.equal(2);
}));

test('a single package with purchases', withChai(async expect => {
  authenticateSession();

  const event = make('event');
  const pack = make('package', 'withPurchases');

  mockFindRecord('package').returns({ model: pack });
  mockFindRecord('event').returns({ model: event });

  await visit(`/events/${event.id}/packages/${pack.id}`);

  expect(currentRouteName()).to.equal('events.show.packages.show.index');

  expect(find('tbody tr').length).to.equal(10);
}));
