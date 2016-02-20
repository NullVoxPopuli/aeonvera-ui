import DS from 'ember-data';

export default DS.Model.extend({
  startDate: DS.attr('date'),
  expiresAt: DS.attr('date'),
  duration: DS.attr('string'),
  expired: DS.attr('boolean'),

  membershipOption: DS.belongsTo('membership-option'),
  member: DS.belongsTo('member')
});
