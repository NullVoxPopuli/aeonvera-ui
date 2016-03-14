import { moduleForModel, test, skip } from 'ember-qunit';
import { manualSetup, make } from 'ember-data-factory-guy';

// setResolver(Ember.DefaultResolver.create({ namespace: 'aeonvera' }))

moduleForModel('host', 'Unit | Model | host', {
  // Specify the other units that are required for this test.
  needs: [
    'model:host',
    'model:event',
    'model:organization',
    'model:integration'
  ],
  beforeEach: function() {
    manualSetup(this.container);
  }
});

test('stripePublishableKey | exists', function() {
  let integration = make('integration', {
    name: 'stripe',
    publishableKey: 'hi'
  });
  let organization = make('organization', { integrations: [integration] });

  let result = organization.get('stripePublishableKey');
  ok(result);
});

test('stripePublishableKey | does not exist', function() {
  let integration = make('integration', {
    publishableKey: 'hi'
  });
  let organization = make('organization', { integrations: [integration] });

  let result = organization.get('stripePublishableKey');
  notOk(result);
});

test('isOrganization', _=> {
  let organization = make('organization');

  ok(organization.get('isOrganization'));
  notOk(organization.get('isEvent'));
});

test('isCommunity', function() {
  let organization = make('organization');

  ok(organization.get('isCommunity'));
  notOk(organization.get('isEvent'));
});

test('isEvent', function() {
  let e = make('event');

  ok(e.get('isEvent'));
  notOk(e.get('isCommunity'));
  notOk(e.get('isOrganization'));
});

test('payableType | for event', function() {
  let e = make('event');
  let result = e.get('payableType');
  ok('Event', result);
});

test('payableType | for org', function() {
  let e = make('organization');
  let result = e.get('payableType');
  ok('Organization', result);
});
