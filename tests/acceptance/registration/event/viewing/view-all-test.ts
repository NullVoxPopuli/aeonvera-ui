import Ember from 'ember';
import { test, skip } from 'ember-qunit';
import { withChai } from 'ember-cli-chai/qunit';

import {
  make, makeList, build, buildList,
  mockFindAll, mockFindRecord, mockQuery,
  mockSetup, mockTeardown
} from 'ember-data-factory-guy';

import moduleForAcceptance from 'aeonvera/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | Registration | Event | View All', {
  beforeEach() { mockSetup(); },
  afterEach() { mockTeardown(); }
});

function mockRequests(objects = {}) {
  const { registration, registrations, event, order } = objects;

  event && mockFindRecord('event').returns({ model: event });
  registration && mockFindRecord('users/registration').returns({ model: registration });
  registrations && mockFindAll('users/registration').returns({ models: registrations });
  registrations && mockQuery('users/registration').returns({ models: registrations });

  order && mockFindRecord('order').returns({ model: order });

  if (event) {
    const url = `/api/hosts/${event.get('domain')}`;
    const payload = { data: { type: 'events', id: 1, attributes: { id: 1, name: event.get('name') } } };

    // custom url mock
    Ember.$.mockjax({ url, responseText: payload, type: 'GET' });
    Ember.$.mockjax({ url: 'https://checkout.stripe.com/api/outer/manhattan?key=a', responseText: {}, type: 'GET' });
  }
}


test('a registration is visible', withChai(async expect => {
  authenticateSession();

  // ember-data mocks
  const event = make('event', { isEvent: true });
  const order = make('order', { paid: false, total: 50, orderLineItems: [] });
  const registrations = makeList('users/registration', 1, { attendeeFirstName: 'First', attendeeLastName: 'Last', orders: [order], unpaidOrder: order });

  const rootRegistrationUrl = `${event.get('domain')}/register/${event.get('id')}`;
  mockRequests({ event, registrations, order });

  await visit(rootRegistrationUrl);
  expect(currentRouteName()).to.eq('register.event-registration.index');

  const text = find('td').text()

  expect(text).to.include('First Last')
}));

test('no items - are incomplete', withChai(async expect => {
  authenticateSession();

  // ember-data mocks
  const event = make('event', { isEvent: true });
  const order = make('order', { paid: false, total: 50, orderLineItems: [] });
  const registrations = makeList('users/registration', 1, { orders: [order], unpaidOrder: order });

  const rootRegistrationUrl = `${event.get('domain')}/register/${event.get('id')}`;
  mockRequests({ event, registrations, order });

  await visit(rootRegistrationUrl);
  expect(currentRouteName()).to.eq('register.event-registration.index');

  const text = find('td').text()

  expect(text).to.include('Incomplete')
}));

test('unpaid items are incomplete', withChai(async expect => {
  authenticateSession();

  // ember-data mocks
  const lineItem = make('package');
  const event = make('event', { isEvent: true, packages: [lineItem] });
  const order = make('order', { paid: false, total: 50, orderLineItems: [] });
  make('order-line-item', { order, lineItem, quantity: 1, price: 50 });
  const registrations = makeList('users/registration', 1, { orders: [order], unpaidOrder: order });

  const rootRegistrationUrl = `${event.get('domain')}/register/${event.get('id')}`;
  mockRequests({ event, registrations, order });

  await visit(rootRegistrationUrl);
  expect(currentRouteName()).to.eq('register.event-registration.index');

  const text = find('td').text()

  expect(text).to.include('Incomplete')
}));

test('items that total to 0 are complete', withChai(async expect => {
  authenticateSession();

  // ember-data mocks
  const lineItem = make('package');
  const discount = make('discount');
  const event = make('event', { isEvent: true, packages: [lineItem] });
  const order = make('order', { paid: true, paidAmount: 50, total: 0, orderLineItems: [] });
  make('order-line-item', { order, lineItem, quantity: 1, price: 50 });
  make('order-line-item', { order, lineItem: discount, quantity: 1, price: -50 });
  const registrations = makeList('users/registration', 1, { amountPaid: 0, orders: [order], unpaidOrder: order });

  const rootRegistrationUrl = `${event.get('domain')}/register/${event.get('id')}`;
  mockRequests({ event, registrations, order });

  await visit(rootRegistrationUrl);
  expect(currentRouteName()).to.eq('register.event-registration.index');

  const text = find('td').text()

  expect(text).to.not.include('Incomplete')
}));

test('items that total to something are incomplete', withChai(async expect => {
  authenticateSession();

  // ember-data mocks
  const lineItem = make('package');
  const event = make('event', { isEvent: true, packages: [lineItem] });
  const order = make('order', { paid: true, paidAmount: 50, total: 50, orderLineItems: [] });
  make('order-line-item', { order, lineItem, quantity: 1, price: 50 });
  const registrations = makeList('users/registration', 1, { amountPaid: 0, orders: [order], unpaidOrder: order });

  const rootRegistrationUrl = `${event.get('domain')}/register/${event.get('id')}`;
  mockRequests({ event, registrations, order });

  await visit(rootRegistrationUrl);
  expect(currentRouteName()).to.eq('register.event-registration.index');

  const text = find('td').text()

  expect(text).to.include('Incomplete')
}));

test('items that are paid for are complete', withChai(async expect => {
  authenticateSession();

  // ember-data mocks
  const lineItem = make('package');
  const event = make('event', { isEvent: true, packages: [lineItem] });
  const order = make('order', { paid: true, paidAmount: 50, total: 50, orderLineItems: [] });
  make('order-line-item', { order, lineItem, quantity: 1, price: 50 });
  const registrations = makeList('users/registration', 1, { amountPaid: 50, orders: [order], unpaidOrder: order });

  const rootRegistrationUrl = `${event.get('domain')}/register/${event.get('id')}`;
  mockRequests({ event, registrations, order });

  await visit(rootRegistrationUrl);
  expect(currentRouteName()).to.eq('register.event-registration.index');

  const text = find('td').text()

  expect(text).to.not.include('Incomplete')
}));
