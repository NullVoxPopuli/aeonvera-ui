import Ember from 'ember';
import DS from 'ember-data';
import Validator from '../mixins/model-validator';

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
  Validator,
  PaymentStatus,
  Checkinable, {
    attendeeName: DS.attr('string'),
    danceOrientation: DS.attr('string'),
    registeredAt: DS.attr('date'),

    packageName: DS.attr('string'),
    levelName: DS.attr('string'),

    interestedInVolunteering: DS.attr('string'),

    eventId: DS.attr('string'),

    attendee: DS.belongsTo('user'),
    pricingTier: DS.belongsTo('pricing-tier'),
    host: DS.belongsTo('host', { polymorphic: true }),

    orders: DS.hasMany('order', { async: true }),
    unpaidOrder: DS.belongsTo('unpaidOrder', { async: true }),

    housingRequest: DS.belongsTo('housing-request', { async: false }),
    housingProvision: DS.belongsTo('housing-provision', { async: false }),
    customFieldResponses: DS.hasMany('custom-field-response', { async: false }),

    // address stuff
    phoneNumber: DS.attr('string'),
    address1: DS.attr('string'),
    address2: DS.attr('string'),
    city: DS.attr('string'),
    state: DS.attr('string'),
    zip: DS.attr('string'),

    hasUnpaidOrder: function () {
      return Ember.isPresent(this.get('unpaidOrder'));
    }.property('unpaidOrder'),

  });
