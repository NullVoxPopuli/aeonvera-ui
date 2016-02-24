import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  needTransportation: DS.attr('boolean'),
  canProvideTransportation: DS.attr('boolean'),
  allergicToPets: DS.attr('boolean'),
  allergicToSmoke: DS.attr('boolean'),
  otherAllergies: DS.attr('string'),
  requestedRoommates: DS.attr(),
  unwantedRoommates: DS.attr(),
  preferredGenderToHouseWith: DS.attr('string'),
  notes: DS.attr('string'),

  host: DS.belongsTo('host', { polymorphic: true }),
  attendance: DS.belongsTo('attendance', { polymorphic: true }),
  housingProvision: DS.belongsTo('housing-provision'),

});
