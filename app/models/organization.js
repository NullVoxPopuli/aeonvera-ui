import Ember from 'ember';
import DS from 'ember-data';
import Host from '../models/host';

export default Host.extend({
  tagline: DS.attr('string'),

  city: DS.attr('string'),
  state: DS.attr('string'),

  beta: DS.attr('boolean'),
  makeAttendeesPayFees: DS.attr('boolean'),

  url: DS.attr('string'),

  owner: DS.belongsTo('user'),
  lessons: DS.hasMany('lessons'),
  membershipOptions: DS.hasMany('membership-option'),
  membershipDiscounts: DS.hasMany('membership-discount'),

  notifyEmail: DS.attr('string'),
  emailAllPurchases: DS.attr('boolean'),
  emailMembershipPurchases: DS.attr('boolean'),

  location: function() {
    return this.get('city') + ', ' + this.get('state');
  }.property('city', 'state'),
});
