import DS from 'ember-data';

export default DS.Model.extend({
  revenuePastMonth: DS.attr('number'),
  unpaidPastMonth: DS.attr('number'),
  newMembershipsPastMonth: DS.attr('number'),
  netReceivedPastMonth: DS.attr('string'),


  // attendances: DS.hasMany('organizationAttendances', {
  //   async: false
  // }),

  organization: DS.belongsTo('organization', {
    async: true
  }),

  recentRegistrations: function() {
    return this.get('attendances');
  }.property('attendances')
});
