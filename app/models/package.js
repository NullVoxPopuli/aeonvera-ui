import Ember from 'ember';
import DS from 'ember-data';
import Purchasable from 'aeonvera/models/purchasable';
import IsLineItem from '../mixins/models/is-line-item';

export default Purchasable.extend(IsLineItem, {
  name: DS.attr('string'),
  initialPrice: DS.attr('number'),
  atTheDoorPrice: DS.attr('number'),
  attendeeLimit: DS.attr('number'),
  expiresAt: DS.attr('date'),
  requiresTrack: DS.attr('boolean'),
  ignorePricingTiers: DS.attr('boolean'),
  numberOfLeads: DS.attr('number'),
  numberOfFollows: DS.attr('number'),
  currentPrice: DS.attr('number'),

  event: DS.belongsTo('event'),
  attendances: DS.hasMany('event-attendance'),

  totalRegistrants: function() {
    return this.get('numberOfLeads') + this.get('numberOfFollows');
  }.property('numberOfLeads', 'numberOfFollows'),

  hasExpiration: function() {
    const expiresAt = this.get('expiresAt');

    return Ember.isPresent(expiresAt);
  }.property('expiresAt')
});
