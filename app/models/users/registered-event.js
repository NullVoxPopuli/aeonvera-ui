import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  registeredAt: DS.attr('date'),
  amountOwed: DS.attr('number'),
  amountPaid: DS.attr('number'),
  eventBeginsAt: DS.attr('date'),
  isAttending: DS.attr('boolean'),
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
