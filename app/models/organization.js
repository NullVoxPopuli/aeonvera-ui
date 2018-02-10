import DS from 'ember-data';
import Host from '../models/host';

const { attr, belongsTo, hasMany } = DS;

export default Host.extend({
  tagline: attr('string'),

  city: attr('string'),
  state: attr('string'),

  beta: attr('boolean'),
  makeAttendeesPayFees: attr('boolean'),

  url: attr('string'),

  owner: belongsTo('user'),
  lessons: hasMany('lessons', { inverse: 'host' }),
  membershipOptions: hasMany('membership-option', { inverse: 'host' }),
  membershipDiscounts: hasMany('membership-discount', { inverse: 'host' }),
  sponsorships: hasMany('sponsorship'),
  orders: hasMany('order', { inverse: 'host' }),
  recentOrders: hasMany('order', { inverse: 'host' }),

  notifyEmail: attr('string'),
  emailAllPurchases: attr('boolean'),
  emailMembershipPurchases: attr('boolean'),

  revenuePastMonth: attr('number'),
  unpaidPastMonth: attr('number'),
  newMembershipsPastMonth: attr('number'),
  netReceivedPastMonth: attr('number'),

  location: function() {
    return this.get('city') + ', ' + this.get('state');
  }.property('city', 'state')
});
