import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  attendeeName: DS.attr('string'),
  danceOrientation: DS.attr('string'),
  amountOwed: DS.attr('number'),
  amountPaid: DS.attr('number'),
  registeredAt: DS.attr('date'),
  checkedInAt: DS.attr('date'),

  packageName: DS.attr('string'),
  levelName: DS.attr('string'),

  eventId: DS.attr('string'),

  unpaidOrder: DS.belongsTo('unpaidOrder', { async: true }),

  hasUnpaidOrder: function(){
    return Ember.isPresent(this.get('unpaidOrder'));
  }.property('unpaidOrder'),

  isCheckedIn: function(){
    return Ember.isPresent(this.get('checkedInAt'));
  }.property('checkedInAt'),

  owesMoney: function(){
    return this.get('amountOwed') > 0;
  }.property('amountOwed'),

  paymentStatus: function(){
    var owed = this.get('amountOwed');
    var paid = this.get('amountPaid');
    var doesOwe = owed > 0;
    var hasPaid = paid > 0;
    var status = "";

    if (doesOwe){
      status += "Owe: $" + owed;
    }

    if (doesOwe && hasPaid){
      status += ", ";
    }

    if (hasPaid){
      status += "Paid: $" + paid;
    }

    return status;

  }.property('amountOwed', 'amountPaid')
});
