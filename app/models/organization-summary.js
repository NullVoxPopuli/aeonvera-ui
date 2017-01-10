import DS from 'ember-data';
import Ember from 'ember';

const { computed } = Ember;

export default DS.Model.extend({
  name: DS.attr('string'),
  domain: DS.attr('string'),

  logoUrlThumb: DS.attr('string'),

  revenuePastMonth: DS.attr('number'),
  unpaidPastMonth: DS.attr('number'),
  newMembershipsPastMonth: DS.attr('number'),
  netReceivedPastMonth: DS.attr('number'),

  attendances: DS.hasMany('attendance', {
    async: false,
  }),

  organization: DS.belongsTo('organization', {
    async: true,
  }),

  recentRegistrations: function () {
    return this.get('attendances');
  }.property('attendances'),

  hostId: computed('id', { get() { return this.get('id'); }}),
  hostType: computed({ get() { return 'Organization'; }})
});
