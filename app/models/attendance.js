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

    orders: DS.hasMany('order', { async: true }),
    unpaidOrder: DS.belongsTo('unpaidOrder', { async: true }),
    housingRequest: DS.belongsTo('housing-request'),
    housingProvision: DS.belongsTo('housing-provision'),

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


    validations: {
      city: { presence: true },
      state: { presence: true },
      package: { presence: true },
      danceOrientation: { presence: true },
      phoneNumber: {
        custom: {
          message: 'Phone Number is required when volunteering.',
          validation(key, value, model){
            if (model.get('interestedInVolunteering')){
              return Ember.isPresent(value);
            }
            return true;
          }
        }
      },
    }
  });
