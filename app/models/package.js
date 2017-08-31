import Ember from 'ember';
import DS from 'ember-data';

import { computed } from 'ember-decorators/object';

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
  description: DS.attr('string'),

  event: DS.belongsTo('event'),
  registrations: DS.hasMany('registration'),
  orderLineItems: DS.hasMany('order-line-item', { async: false }),

  @computed('numberOfLeads', 'numberOfFollows')
  totalRegistrants(numberOfLeads, numberOfFollows) {
    return numberOfLeads + numberOfFollows;
  },

  @computed('expiresAt')
  hasExpiration(expiresAt) {
    return Ember.isPresent(expiresAt);
  }
});
