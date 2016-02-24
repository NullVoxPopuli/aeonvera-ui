import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  registeredAt: DS.attr('date'),
  amountOwed: DS.attr('number'),
  amountPaid: DS.attr('number'),
  eventBeginsAt: DS.attr('date'),
  isAttending: DS.attr('boolean'),
  url: DS.attr('string'),

  registrationStatus: function () {
    if (this.get('isAttending')) {
      return 'Attending';
    } else {
      return 'Not Attending';
    }
  }.property('isAttending'),

  paymentStatus: function () {
    var paid = this.get('amountPaid');
    var owe = this.get('amountOwed');
    var hasPaid = paid > 0;
    var doesOwe = owe > 0;

    var status = '';

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

  }.property('amountOwed', 'amountPaid'),

});
