import Ember from 'ember';
import DS from 'ember-data';
import attr from 'ember-data/attr';

import Buyable from '../mixins/models/buyable';
import IsLineItem from '../mixins/models/is-line-item';
import Purchasable from 'aeonvera/models/purchasable';
import File from 'ember-data-paperclip/objects/file';

export default Purchasable.extend(Buyable, IsLineItem, {
  name: DS.attr('string'),
  description: DS.attr('string', { defaultValue: '' }),
  price: DS.attr('number', { defaultValue: 0 }),
  itemType: DS.attr('string'),
  numberPurchased: DS.attr('number'),

  schedule: DS.attr('string'),
  durationAmount: DS.attr('number'),
  durationUnit: DS.attr('number'),

  expiresAt: DS.attr('date'),
  startsAt: DS.attr('date'),
  endsAt: DS.attr('date'),

  registrationOpensAt: DS.attr('date'),
  registrationClosesAt: DS.attr('date'),
  becomesAvailableAt: DS.attr('date'),

  picture: attr('file', { defaultValue: function() { return File.create(); } }),
  pictureFileName: attr('string'),
  pictureFileSize: attr('string'),
  pictureUpdatedAt: attr('date'),
  pictureUrl: attr('string'),
  pictureUrlThumb: attr('string'),
  pictureUrlMedium: attr('string'),

  event: DS.belongsTo('event'),
  host: DS.belongsTo('host', { polymorphic: true }),
  attendances: DS.hasMany('attendance'),

  pictureIsMissing: Ember.computed('pictureUrl', function() {
    let pictureUrl = this.get('pictureUrl');
    let picturePresent = Ember.isPresent(pictureUrl);
    return picturePresent ? pictureUrl.indexOf('missing') !== -1 : true;
  }),

});
