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
      async: true,
      params: {
        attendance_id: 'hasManyParams'
      }
    }),
    unpaidOrder: DS.belongsTo('unpaidOrder', {
      async: true
    }),
    // TODO: this is a hack, couple with an adapter hack
    // check ember data later if it can do hasMany query params
    hasManyParams: function() {
      let id = this.get('id');
      return {
        'attendance_id': id
      };
    }.property(),

    hasUnpaidOrder: function() {
      return Ember.isPresent(this.get('unpaidOrder'));
    }.property('unpaidOrder')

  });
