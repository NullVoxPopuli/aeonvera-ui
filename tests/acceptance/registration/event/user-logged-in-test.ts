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

moduleForAcceptance('Acceptance | Registration | Event | User is logged in', {
  beforeEach() { mockSetup({ logLevel: 1, mockjaxLogLevel: 4 }); },
  afterEach() { mockTeardown(); }
});

async function setup(eventOpensAt: Date = null) {
  authenticateSession();

  const opensAt = eventOpensAt ||  moment().add(1, 'days').toDate()
  const event = make('event', { registrationOpensAt: opensAt, openingTier: { date: opensAt } });

  mockFindRecord('event').returns({ model: event });

  const url = `/api/hosts/${event.get('domain')}`;
  const payload = { data: { type: 'events', id: event.id, attributes: { id: event.id, name: event.get('name') } } };

  Ember.$.mockjax({ url, responseText: payload, type: 'GET' });

  return event;
}

test('can view the registration welcome / not-ready page', withChai(async expect => {
  const event = await setup();
  const domain = event.get('domain');

  await visit(`/${domain}`);

  expect(currentURL()).to.equal(`/${domain}/register/${event.id}/not-yet`);
}));

test('does not render form', withChai(async expect => {
  const event = await setup();
  const domain = event.get('domain');

  await setup(event);
  await visit(`/${domain}`);

  const pText = find('p').text();

  expect(pText).to.include('Registration opens at');
}));

test('shows the countdown', withChai(async expect => {
  const event = await setup();
  const domain = event.get('domain');

  await visit(`/${domain}`);

  // because we don't know how long it'll be before the dom is evaluated
  const timeTags = find('h2 span').text();
  const timeLeft = timeTags.includes('seconds') || timeTags.includes('minutes') || timeTags.includes('day');

  expect(timeLeft).to.equal(true);
}));

skip('shows the form once the contdown has completed', withChai(async expect => {
  const yesterday = moment().subtract(1, 'days').toDate();
  const event = await setup();
  const domain = event.get('domain');

  await visit(`/${domain}`);

  const loader = find('.ubuntu-loader');

  expect(loader.length).to.equal(1);

  event.set('registrationOpensAt', yesterday);
  event.notifyPropertyChange('registrationIsOpen');

  // give the run loop and dom time to update (2 seconds is way more than enough)
  // setTimeout(() => {
    const h2s = find('h2');
    const text = h2s.text();

    expect(text).to.include(`Register for ${event.get('name')}`);
  // }, 2000);
}));
