import Ember from 'ember';
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
  */
  partnerName: DS.attr('string'),
  danceOrientation: DS.attr('string'),
  size: DS.attr('string'),

  /*
    This is never received from the server, but will be set upon
    an attempt to delete an order-line-item. The use case for this
    is only when deleting a previously persisted order-line-item when
    the order was created on a non-logged-in account.
  */
  paymentToken: DS.attr('string'),

  priceNeedsChanging: function() {
    let lineItem = this.get('lineItem');
    let size = this.get('size');
    let sizeMethod = lineItem.priceForSize;
    if (Ember.isPresent(sizeMethod)){
      let sizePrice = sizeMethod(size);
      this.set('price', sizePrice);
    }
  }.observes('size'),

  total: function() {
    let price = this.get('price');
    let quantity = this.get('quantity');
    let total = price * quantity;

    return total;
  }.property('price', 'quantity'),

});
