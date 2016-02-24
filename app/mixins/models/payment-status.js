import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Mixin.create({
  amountOwed: DS.attr('number'),
  amountPaid: DS.attr('number'),

  owesMoney: function () {
    return this.get('amountOwed') > 0;
  }.property('amountOwed'),

  hasPaid: function () {
    let amountPaid = this.get('amountPaid');

    return (amountPaid !== 0 && Ember.isPresent(amountPaid));
  }.property('amountPaid'),

  paymentStatus: function () {
    var owed = this.get('amountOwed');
    var paid = this.get('amountPaid');
    var doesOwe = owed > 0;
    var hasPaid = paid > 0;
    var status = '';

    if (doesOwe) {
      status += 'Owe: $' + owed;
    }

    if (doesOwe && hasPaid) {
      status += ', ';
    }

    if (hasPaid) {
      status += 'Paid: $' + paid;
    }

    return status;

  }.property('amountOwed', 'amountPaid'),
});
