import Ember from 'ember';
import DS from 'ember-data';
import { computed } from 'ember-decorators/object';

const { attr, belongsTo, hasMany } = DS;

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
    attendeeName: attr('string'),
    // TODO: create these on the backend:
    attendeeFirstName: attr('string'),
    attendeeLastName: attr('string'),

    attendeeEmail: attr('string'),

    danceOrientation: attr('string'),
    registeredAt: attr('date'),

    packageName: attr('string'),
    levelName: attr('string'),

    interestedInVolunteering: attr('string'),

    eventId: attr('string'),

    attendee: belongsTo('user'),
    pricingTier: belongsTo('pricing-tier'),
    host: belongsTo('host', { polymorphic: true }),

    orders: hasMany('order', { async: true, inverse: 'registration' }),
    unpaidOrder: belongsTo('unpaidOrder', { async: true, inverse: 'registration' }),

    housingRequest: belongsTo('housing-request', { async: false }),
    housingProvision: belongsTo('housing-provision', { async: false }),
    customFieldResponses: hasMany('custom-field-response', { async: true }),

    packageId: attr('number'),
    level: belongsTo('level', { async: false }),
    package: belongsTo('package'),


    // address stuff
    phoneNumber: attr('string'),
    address1: attr('string'),
    address2: attr('string'),
    city: attr('string'),
    state: attr('string'),
    zip: attr('string'),

    hasUnpaidOrder: function() {
      return Ember.isPresent(this.get('unpaidOrder'));
    }.property('unpaidOrder'),

    @computed('attendeeFirstName', 'attendeeLastName')
    fullName(firstName, lastName) {
      return `${firstName} ${lastName}`;
    },

    @computed('attendeeName', 'attendeeFirstName', 'attendeeLastName')
    name(attendeeName, attendeeFirstName, attendeeLastName) {
      if (isPresent(attendeeFirstName) || isPresent(attendeeLastName)) {
        return `${attendeeFirstName} ${attendeeLastName}`;
      }

      return attendeeName;

    },

    hasUsedStudentDiscount: Ember.computed('orders.@each', {
      get() {
        let result = false;

        this.get('orders').forEach(order => {
          order.get('orderLineItems').forEach(orderLineItem => {
            const requiresStudentId = orderLineItem.get('lineItem.requiresStudentId');

            if (requiresStudentId) {
              result = true;
            }
          });
        });

        return result;
      }
    }),

    validations: {
      city: { presence: true },
      state: { presence: true },
      danceOrientation: { presence: true },
      phoneNumber: {
        custom: {
          message: 'Phone Number is required when volunteering.',
          validation(key, value, model) {
            if (model.get('interestedInVolunteering')) {
              return Ember.isPresent(value);
            }

            return true;
          }
        }
      },
      package: { presence: true },
      level: {
        custom: {
          message: 'Level is required for the selected ticket.',

          // value may be a promise here
          // so we need to see if we can access the
          // id property on it
          validation(key, value, model) {
            const requiresLevel = model.get('package.requiresTrack');

            if (requiresLevel) {
              // value is undefined for some reason
              return Ember.isPresent(model.get('level.id'));
            }

            return true;
          }
        }
      }
    }

  });
