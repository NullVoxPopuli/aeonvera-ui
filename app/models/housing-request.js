import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  needTransportation:         DS.attr('boolean', { defaultValue: false }),
  canProvideTransportation:   DS.attr('boolean', { defaultValue: false }),
  transportationCapacity:     DS.attr('number', { defaultValue: 0 }),
  allergicToPets:             DS.attr('boolean', { defaultValue: false }),
  allergicToSmoke:            DS.attr('boolean', { defaultValue: true }),
  otherAllergies:             DS.attr('string'),
  preferredGenderToHouseWith: DS.attr('string', { defaultValue: 'No Preference' }),
  notes:                      DS.attr('string'),

  host:             DS.belongsTo('host', { polymorphic: true }),
  attendance:       DS.belongsTo('attendance', { polymorphic: true }),
  housingProvision: DS.belongsTo('housing-provision'),

  requested1: DS.attr(),
  requested2: DS.attr(),
  requested3: DS.attr(),
  requested4: DS.attr(),

  unwanted1: DS.attr(),
  unwanted2: DS.attr(),
  unwanted3: DS.attr(),
  unwanted4: DS.attr(),

  // these come from the server as an array, but in
  // the serializer for this model are converted to
  // the above 8 properties
  requestedRoommates: DS.attr(),
  unwantedRoommates: DS.attr(),
});
