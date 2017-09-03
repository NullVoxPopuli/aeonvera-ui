import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';
import { withChai } from 'ember-cli-chai/qunit';
import { make, manualSetup }  from 'ember-data-factory-guy';

import moment from 'moment';

moduleForModel('event', 'Unit |Model | event', {
  needs: [
    'model:opening-tier',
    'model:pricing-tier',
    'model:package',
    'model:level',
    'model:competition',
    'model:line-item',
    'model:shirt',
    'model:custom-field',
    'model:sponsorship',
    'model:registration',
    'model:integration'
  ],

  beforeEach() {
    manualSetup(this.container);
  }
});

test('#registrationIsOpen is true once registrationOpensAt is in the past', function(assert) {
  const openingTier = make('opening-tier');
  const event = make('event', { openingTier });

  Ember.run(() => event.set('registrationOpensAt', moment().subtract(1, 'days').toDate()));

  assert.ok(event.get('registrationIsOpen'))
});

test('#registrationIsOpen is false if registrationOpensAt is in the future', function(assert) {
  const openingTier = make('opening-tier');
  const event = make('event', { openingTier });

  Ember.run(() => event.set('registrationOpensAt', moment().add(1, 'days').toDate()));

  assert.notOk(event.get('registrationIsOpen'))
});
