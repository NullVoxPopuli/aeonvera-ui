import DS from 'ember-data';

/*
  join model for competitions and attendances.
  competition <--*----------*--> attendance
  - many to many
*/
export default DS.Model.extend({
  attendance: DS.belongsTo('attendance', { polymorphic: true }),
  competition: DS.belongsTo('competition'),

  danceOrientation: DS.attr('string'),
  partnerName: DS.attr('string'),


});
