import { moduleForModel, test, skip } from 'ember-qunit';
import { manualSetup, make } from 'ember-data-factory-guy';

// setResolver(Ember.DefaultResolver.create({ namespace: 'aeonvera' }))

moduleForModel('user', 'Unit | Model | user', {
  // Specify the other units that are required for this test.
  needs: [
    'model:user',
    'model:member',
    'model:host',
    'model:organization',
    'model:membership-option',
    'model:membership-renewal'
  ],
  beforeEach: function() {
    manualSetup(this.container);
  }
});

test('name | concats first and last name', function(assert){
  let user = make('user', {
    firstName: 'first',
    lastName: 'last'
  });

  let result = user.get('name');
  assert.equal(result, 'first last');
});

test('isMemberOf | is not a member', function(assert) {
  let organization = make('organization');
  let user = make('user');

  let result = user.isMemberOf(organization);
  assert.notOk(result);
});

test('isMemberOf | is a member', function(assert){
  let organization = make('organization');
  let user = make('user');
  let option = make('membership-option', { host: organization });
  let renewal = make('membership-renewal', {
    membershipOption: option,
    member: user,
    expired: false
  });
  user.membershipRenewals = [renewal];

  let result = user.isMemberOf(organization);
  assert.ok(result);
});

test('isMemberOf | is not a member if the renewal is expired', function(assert){
  let organization = make('organization');
  let user = make('user');
  let option = make('membership-option', { host: organization });
  let renewal = make('membership-renewal', {
    membershipOption: option,
    member: user,
    expired: true
  });
  user.membershipRenewals = [renewal];

  let result = user.isMemberOf(organization);
  assert.notOk(result);
});
