import Ember from 'ember';
import { module, test, skip } from 'qunit';
import { withChai } from 'ember-cli-chai/qunit';
import moment from 'moment';

import {
  make, makeList, build,
  mockFindAll, mockFindRecord,
  mockSetup, mockTeardown
} from 'ember-data-factory-guy';

import moduleForAcceptance from 'aeonvera/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | At The Door | Events | POS | Navigation', {
  beforeEach() { mockSetup({ logLevel: 1, mockjaxLogLevel: 4 }); },
  afterEach() { mockTeardown(); }
});

async function setup(event) {
  authenticateSession();
  await visit(`/dashboard/event-at-the-door/${event.id}`)
}

async function toPOS(event) {
  await visit(`/dashboard/event-at-the-door/${event.id}/a-la-carte`);
}

function makeEvent() {
  const competitions = makeList('competition', 3);
  const packages = makeList('package', 4)
  const event = make('event', { competitions, packages });
  mockFindRecord('event').returns({ model: event });
  return event;
}

test('navigate to the at the door home', withChai(async expect => {
  const event = makeEvent();
  await setup(event);

  expect(currentRouteName()).to.eq('event-at-the-door.index');
}));

test('navigate to the pos', withChai(async expect => {
  const event = makeEvent();
  await setup(event);
  await toPOS(event);

  expect(currentRouteName()).to.eq('event-at-the-door.a-la-carte.index');
}));

test('navigate to tab on the pos', withChai(async expect => {
  const event = makeEvent();
  await setup(event);
  await visit(`dashboard/event-at-the-door/${event.id}/a-la-carte/competitions`);

  expect(currentRouteName()).to.eq('event-at-the-door.a-la-carte.competitions');
}));

const competitionsSelector = '[data-test-puchasable-items="competitions"]';
const ticketsSelector = '[data-test-puchasable-items="packages"]';
const purchasableItemSelector = '[data-test-puchasable-item]';

test('competitions show up in the competition tab', withChai(async expect => {
  const event = makeEvent();
  await setup(event);
  await visit(`dashboard/event-at-the-door/${event.id}/a-la-carte/competitions`);

  const items = find(`${purchasableItemSelector}`);

  expect(items.length).to.eq(3);
}));

test('packages do not show in the competitions tab', withChai(async expect => {
  const event = makeEvent();
  await setup(event);
  await visit(`dashboard/event-at-the-door/${event.id}/a-la-carte/competitions`);

  const items = find(`${ticketsSelector}`);

  expect(items.length).to.eq(0);
}));
