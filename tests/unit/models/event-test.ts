import { moduleFor, test } from 'ember-qunit';
import { withChai } from 'ember-cli-chai/qunit';
import moment from 'moment';

moduleFor('model:event', 'Unit | Event', {
  unit: true
});

test('#registrationIsOpen is true once registrationOpensAt is in the past', withChai(expect => {
  const event = this.subject();

  event.set('registrationOpensAt', moment().subtract(1, 'days').toDate());

  expect(event.get('registrationIsOpen')).to.equal(true);
}));

test('#registrationIsOpen is false if registrationOpensAt is in the future', withChai(expect => {
  const event = this.subject();

  event.set('registrationOpensAt', moment().add(1, 'days').toDate());

  expect(event.get('registrationIsOpen')).to.equal(false);
}));
