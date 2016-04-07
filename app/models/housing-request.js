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
  preferredGenderToHouseWith: DS.attr('string', { defaultValue: 'No Preference' }),
  notes: DS.attr('string'),

  host: DS.belongsTo('host', { polymorphic: true }),
  attendance: DS.belongsTo('attendance', { polymorphic: true }),
  housingProvision: DS.belongsTo('housing-provision'),


  genderOptions: ['No Preference', 'Guys', 'Gals'],

  // TODO: Figure out a better way to record n-number of roommates
  requested1: null,
  requested2: null,
  requested3: null,
  requested4: null,

  unwanted1: null,
  unwanted2: null,
  unwanted3: null,
  unwanted4: null,
});
