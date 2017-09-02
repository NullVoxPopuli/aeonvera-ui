import { moduleForModel, test, skip } from 'ember-qunit';
import { manualSetup, make } from 'ember-data-factory-guy';

// setResolver(Ember.DefaultResolver.create({ namespace: 'aeonvera' }))

moduleForModel('host', 'Unit | Model | host', {
  // Specify the other units that are required for this test.
  needs: [
    'model:host',
    'model:event',
    'model:organization',
    'model:integration',
    'model:opening-tier'
  ],
  beforeEach: function() {
    manualSetup(this.container);
  }
});

test('stripePublishableKey | exists', function(assert) {
  let integration = make('integration', {
    kind: 'stripe',
    publishableKey: 'hi'
  });
  let organization = make('organization', { integrations: [integration] });

  let result = organization.get('stripePublishableKey');
  assert.ok(result);
});

test('stripePublishableKey | does not exist', function(assert) {
  let integration = make('integration', {
    publishableKey: 'hi'
  });
  let organization = make('organization', { integrations: [integration] });

  let result = organization.get('stripePublishableKey');
  assert.notOk(result);
});

test('isOrganization', function(assert) {
  let organization = make('organization');

  assert.ok(organization.get('isOrganization'));
  assert.notOk(organization.get('isEvent'));
});

test('isEvent', function(assert) {
  let e = make('event');

  assert.ok(e.get('isEvent'));
  assert.notOk(e.get('isOrganization'));
});

test('payableType | for event', function(assert) {
  let e = make('event');
  let result = e.get('payableType');
  assert.ok('Event', result);
});

test('payableType | for org', function(assert) {
  let e = make('organization');
  let result = e.get('payableType');
  assert.ok('Organization', result);
});
