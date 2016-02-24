import DS from 'ember-data';
import Buyable from '../mixins/models/buyable';
import IsLineItem from '../mixins/models/is-line-item';

export default DS.Model.extend(Buyable, IsLineItem, {
  name: DS.attr('string'),
  description: DS.attr('string'),
  price: DS.attr('number'),
  itemType: DS.attr('string'),
  numberPurchased: DS.attr('number'),

  schedule: DS.attr('string'),
  durationAmount: DS.attr('number'),
  durationUnit: DS.attr('number'),

  pictureUrlMedium: DS.attr('string'),
  pictureUrlThumb: DS.attr('string'),
  pictureUrl: DS.attr('string'),

  expiresAt: DS.attr('date'),
  startsAt: DS.attr('date'),
  endsAt: DS.attr('date'),

  registrationOpensAt: DS.attr('date'),
  registrationClosesAt: DS.attr('date'),
  becomesAvailableAt: DS.attr('date'),

  event: DS.belongsTo('event'),
  host: DS.belongsTo('host', {
    polymorphic: true,
  }),

  attendances: DS.hasMany('attendance'),

});
