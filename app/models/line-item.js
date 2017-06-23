import Ember from 'ember';
import DS from 'ember-data';
import attr from 'ember-data/attr';

import { belongsTo, hasMany } from 'ember-data/relationships';

import Buyable from '../mixins/models/buyable';
import IsLineItem from '../mixins/models/is-line-item';
import Purchasable from 'aeonvera/models/purchasable';
import File from 'ember-data-paperclip/objects/file';

export default Purchasable.extend(Buyable, IsLineItem, {
  name: attr('string'),
  description: attr('string', { defaultValue: '' }),
  price: attr('number', { defaultValue: 0 }),
  itemType: attr('string'),
  numberPurchased: attr('number'),
  initialStock: attr('number'),
  remainingStock: attr('number'),

  schedule: attr('string'),
  durationAmount: attr('number'),
  durationUnit: attr('number'),

  expiresAt: attr('date'),
  startsAt: attr('date'),
  endsAt: attr('date'),

  registrationOpensAt: attr('date'),
  registrationClosesAt: attr('date'),
  becomesAvailableAt: attr('date'),

  picture: attr('file', { defaultValue: function() {
    return File.create();
  } }),
  pictureFileName: attr('string'),
  pictureFileSize: attr('string'),
  pictureUpdatedAt: attr('date'),
  pictureUrl: attr('string'),
  pictureUrlThumb: attr('string'),
  pictureUrlMedium: attr('string'),

  event: belongsTo('event', { inverse: 'lineItems' }),
  host: belongsTo('host', { polymorphic: true }),
  membershipDiscount: belongsTo('membership-discount'),
  attendances: hasMany('attendance'),
  orderLineItems: hasMany('order-line-item'),

  pictureIsMissing: Ember.computed('pictureUrl', function() {
    const pictureUrl = this.get('pictureUrl');
    const picturePresent = Ember.isPresent(pictureUrl);

    return picturePresent ? pictureUrl.indexOf('missing') !== -1 : true;
  })

});
