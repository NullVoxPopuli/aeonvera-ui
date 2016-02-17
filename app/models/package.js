import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  initialPrice: DS.attr('number'),
  attendeeLimit: DS.attr('number'),
  expiresAt: DS.attr('date'),
  requiresTrack: DS.attr('boolean'),
  ignorePricingTiers: DS.attr('boolean'),
  numberOfLeads: DS.attr('number'),
  numberOfFollows: DS.attr('number'),
  currentPrice: DS.attr('number'),

  event: DS.belongsTo('event'),

  totalRegistrants: function() {
    return this.get('numberOfLeads') + this.get('numberOfFollows');
  }.property('numberOfLeads', 'numberOfFollows'),

  hasExpiration: function() {
    let expiresAt = this.get('expiresAt');
    return Ember.isPresent(expiresAt);
  }.property('expiresAt')
});
