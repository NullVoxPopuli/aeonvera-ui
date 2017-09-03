import Ember from 'ember';
import { test, skip } from 'ember-qunit';
import { withChai } from 'ember-cli-chai/qunit';

import {
  make, makeList, build, buildList,
  mockFindAll, mockFindRecord, mockQuery,
  mockSetup, mockTeardown
} from 'ember-data-factory-guy';

import moduleForAcceptance from 'aeonvera/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | Registration | Event | Editing', {
  beforeEach() { mockSetup({ logLevel: 1, mockjaxLogLevel: 4 }); },
  afterEach() { mockTeardown(); }
});


// selectors
const editButton = '[data-test-edit-button]';
const topNavCompetitions = '[data-test-registration-top-nav="competitions"]';

async function preExistingRegistration(expect) {
  authenticateSession();

  // event stuff
  const packages = makeList('package', 2);
  const competition = make('competition');
  const openingTier = make('pricing-tier', { date: new Date(2016, 7) });
  const event = make('event', { isEvent: true, openingTier, packages, competitions: [competition] });

  // registration stuff
  const orderLineItem = make('order-line-item', { price: 50, quantity: 1, lineItem: packages.get(0) })
  const order = make('order', { paid: false, total: 50, orderLineItems: [orderLineItem] });
  const registration = make('users/registration', { orders: [order] })

  // mocking api requests
  mockFindRecord('event').returns({ model: event });
  mockFindRecord('users/registration').returns({ model: registration });
  mockFindRecord('order').returns({ model: order });

  const url = `/api/hosts/${event.get('domain')}`;
  const payload = { data: { type: 'events', id: 1, attributes: { id: 1, name: event.get('name') } } };

  // custom url mock
  Ember.$.mockjax({ url, responseText: payload, type: 'GET' });
  Ember.$.mockjax({ url: 'https://checkout.stripe.com/api/outer/manhattan?key=a', responseText: {}, type: 'GET' });

  // test start
  await visit(`/${event.get('domain')}/register/${event.get('id')}/${registration.get('id')}`);

  expect(currentRouteName()).to.equal('register.event-registration.show.index');
}

// skipped because for some reason the test is set up wrong,
// and loading the community registration route
// and also I don't know what StripeCheckout's deal is.
skip('can go back to add a competition', withChai(async expect => {
  await preExistingRegistration(expect);

  console.log(
    currentURL(),
    currentRouteName(),
    find('.small-12.columns p.left').html());

  await click(editButton);
  expect(currentRouteName()).to.equal('register.event-registration.show.edit.index');

  await click(topNavCompetitions);
  expect(currentRouteName()).to.equal('register.event-registration.show.edit.competitions');


}));
