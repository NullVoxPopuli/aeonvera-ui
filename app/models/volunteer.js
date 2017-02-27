import DS from 'ember-data';
import PaymentStatus from '../mixins/models/payment-status';
import Checkinable from '../mixins/models/checkinable';

export default DS.Model.extend(
  PaymentStatus,
  Checkinable, {

    attendeeName: DS.attr('string'),
    attendeeEmail: DS.attr('string'),
    phoneNumber: DS.attr('string'),

    event: DS.belongsTo('event')

  });
