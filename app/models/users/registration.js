import DS from 'ember-data';

import Registration from 'aeonvera/models/registration';

export default Registration.extend({
  eventBeginsAt: DS.attr('date'),
  url: DS.attr('string'),

  registrationStatus: function() {
    if (this.get('isAttending')) {
      return 'Attending';
    }
    return 'Not Attending';

  }.property('isAttending'),

  paymentStatus: function() {
    const paid = this.get('amountPaid');
    const owe = this.get('amountOwed');
    const hasPaid = paid > 0;
    const doesOwe = owe > 0;

    let status = '';

    if (hasPaid) {
      status = 'Paid: $' + paid;
    }

    if (hasPaid && doesOwe) {
      status = status + '; ';
    }

    if (doesOwe) {
      status = status + 'Owe: $' + owe;
    }

    return status;

  }.property('amountOwed', 'amountPaid')
});
