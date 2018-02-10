import { isPresent, isBlank } from '@ember/utils';
import Mixin from '@ember/object/mixin';
import DS from 'ember-data';

export default Mixin.create({
  amountOwed: DS.attr('number'),
  amountPaid: DS.attr('number'),

  owesMoney: function() {
    return this.get('amountOwed') > 0;
  }.property('amountOwed'),

  hasPaid: function() {
    const amountPaid = this.get('amountPaid');

    return amountPaid !== 0 && isPresent(amountPaid);
  }.property('amountPaid'),

  paymentStatus: function() {
    const owed = this.get('amountOwed');
    const paid = this.get('amountPaid');
    const doesOwe = owed > 0;
    const hasPaid = paid > 0;
    let status = '';

    if (doesOwe) {
      status += 'Owe: $' + owed;
    }

    if (doesOwe && hasPaid) {
      status += ', ';
    }

    if (hasPaid) {
      status += 'Paid: $' + paid;
    }

    if (isBlank(status)) {
      // something is off...


      // do we have an order?
      const orders = this.get('orders');

      if (orders.get('length') === 0) {
        return 'in-progress';
      }
    }

    return status;

  }.property('amountOwed', 'amountPaid')
});
