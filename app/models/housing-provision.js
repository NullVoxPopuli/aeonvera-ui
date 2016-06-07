import Ember from 'ember';
import DS from 'ember-data';
import PaymentStatus from '../mixins/models/payment-status';

export default DS.Model.extend({
  housingCapacity: DS.attr('number', { defaultValue: 0 }),
  numberOfShowers: DS.attr('number', { defaultValue: 0 }),
  canProvideTransportation: DS.attr('boolean', { defaultValue: false }),
  transportationCapacity: DS.attr('number', { defaultValue: 0 }),
  preferredGenderToHost: DS.attr('string', { defaultValue: 'No Preference' }),
  hasPets: DS.attr('boolean', { defaultValue: false }),
  smokes: DS.attr('boolean', { defaultValue: false }),
  notes: DS.attr('string'),

  host: DS.belongsTo('host', { polymorphic: true }),
  attendance: DS.belongsTo('attendance', { polymorphic: true }),

});
