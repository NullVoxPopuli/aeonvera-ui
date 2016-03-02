import DS from 'ember-data';
import Discount from '../models/discount';

export default DS.Model.extend({
  lineItem: DS.belongsTo('purchasable', {
    async: true,
    polymorphic: true,
  }),
  order: DS.belongsTo('order'),
  quantity: DS.attr('number'),
  price: DS.attr('number'),

  /*
    these properties are for additional objects that need to be created on the
    server, and are not actually stored with the order-line-item
    TODO: maybe the order-line-item could have an additional polymorphic
    associations that could point to stuff like the competition-response
    - This would make rendering of the order summaries MUCH easier...

    TODO: there should also be shirt responses (and there aren't. boo).
  */
  partnerName: DS.attr('string'),
  danceOrientation: DS.attr('string'),
  size: DS.attr('string'),

  priceNeedsChanging: function() {
    let lineItem = this.get('lineItem');
    let size = this.get('size');
    let sizePrice = lineItem.priceForSize(size);
    this.set('price', sizePrice);
  }.observes('size'),

  total: function() {
    let price = this.get('price');
    let quantity = this.get('quantity');
    let total = price * quantity;

    return total;
  }.property('price', 'quantity'),

});
