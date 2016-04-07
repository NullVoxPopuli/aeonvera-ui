import Ember from 'ember';
import DS from 'ember-data';
import PaymentStatus from '../mixins/models/payment-status';

export default DS.Model.extend({
  housingCapacity: DS.attr('number'),
  numberOfShowers: DS.attr('number'),
  canProvideTransportation: DS.attr('boolean'),
  transportationCapacity: DS.attr('number'),
  preferredGenderToHost: DS.attr('string', { defaultValue: 'No Preference' }),
  hasPets: DS.attr('boolean'),
  smokes: DS.attr('boolean'),
  notes: DS.attr('string'),

  host: DS.belongsTo('host', { polymorphic: true }),
  attendance: DS.belongsTo('attendance', { polymorphic: true }),

  genderOptions: ['No Preference', 'Guys', 'Gals'],

});
