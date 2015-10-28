import DS from 'ember-data';
import Buyable from '../mixins/models/buyable';

export default DS.Model.extend(Buyable, {
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

  expiresAt: DS.attr('date'),
  startsAt: DS.attr('date'),
  endsAt: DS.attr('date'),

  registrationOpensAt: DS.attr('date'),
  registrationClosesAt: DS.attr('date'),
  becomesAvailableAt: DS.attr('date'),

  event: DS.belongsTo('event'),
  host: DS.belongsTo('host', { polymorphic: true } )

});
