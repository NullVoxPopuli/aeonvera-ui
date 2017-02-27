import Ember from 'ember';
import DS from 'ember-data';
import Host from '../models/host';

const {attr, belongsTo, hasMany} = DS;

export default Host.extend({
  tagline: attr('string'),

  city: attr('string'),
  state: attr('string'),

  beta: attr('boolean'),
  makeAttendeesPayFees: attr('boolean'),

  url: attr('string'),

  owner: belongsTo('user'),
  lessons: hasMany('lessons'),
  membershipOptions: hasMany('membership-option'),
  membershipDiscounts: hasMany('membership-discount'),
  sponsorships: hasMany('sponsorship'),

  notifyEmail: attr('string'),
  emailAllPurchases: attr('boolean'),
  emailMembershipPurchases: attr('boolean'),

  location: function() {
    return this.get('city') + ', ' + this.get('state');
  }.property('city', 'state')
});
