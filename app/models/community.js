import Ember from 'ember';
import DS from 'ember-data';
import Host from '../models/host';

export default Host.extend({
  tagline: DS.attr('string'),

  city: DS.attr('string'),
  state: DS.attr('string'),

  beta: DS.attr('boolean'),
  makeAttendeesPayFees: DS.attr('boolean'),

  logoFileName: DS.attr('string'),
  logoFileSize: DS.attr('number'),
  logoUpdatedAt: DS.attr('date'),
  logoUrl: DS.attr('string'),
  logoUrlThumb: DS.attr('string'),
  logoUrlMedium: DS.attr('string'),

  url: DS.attr('string'),

  owner: DS.belongsTo('user'),
  lessons: DS.hasMany('lessons'),
  membershipOptions: DS.hasMany('membership-option'),
  membershipDiscounts: DS.hasMany('membership-discount'),

  location: function() {
    return this.get('city') + ', ' + this.get('state');
  }.property('city', 'state'),

  logoIsMissing: function() {
    let logoUrl = this.get('logoUrl');
    let logoPresent = Ember.isPresent(logoUrl);
    return logoPresent ? logoUrl.indexOf('missing') !== -1 : true;
  }.property('logoUrl'),
});
