import Ember from 'ember';
import DS from 'ember-data';
// provides:
// - amountOwed
// - amountPaid
// - owesMoney
// - hasPaid
// - paymentStatus
import PaymentStatus from '../mixins/models/payment-status';
// provides:
// - checkedInAt
// - isCheckedIn
import Checkinable from '../mixins/models/checkinable';

export default DS.Model.extend(
  PaymentStatus,
  Checkinable, {
    attendeeName: DS.attr('string'),
    danceOrientation: DS.attr('string'),
    registeredAt: DS.attr('date'),

    packageName: DS.attr('string'),
    levelName: DS.attr('string'),

    eventId: DS.attr('string'),

    orders: DS.hasMany('order', {
      async: true
    }),

    unpaidOrder: DS.belongsTo('unpaidOrder', {
      async: true
    }),

    hasUnpaidOrder: function() {
      return Ember.isPresent(this.get('unpaidOrder'));
    }.property('unpaidOrder')

  });
