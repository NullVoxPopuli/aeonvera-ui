import DS from 'ember-data';
import Discount from '../models/discount';

export default DS.Model.extend({
  lineItem: DS.belongsTo('line-item', {
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

  priceNeedsChanging: function () {
    let lineItem = this.get('lineItem');
    let size = this.get('size');
    let sizePrice = lineItem.priceForSize(size);
    this.set('price', sizePrice);
  }.observes('size'),

  total: function () {
    let price = this.get('price');
    let quantity = this.get('quantity');
    let total = price * quantity;

    total = this.applyMembershipDiscount(total);

    return total;
  }.property('price', 'quantity'),

  applyMembershipDiscount(total){
    // apply any discounts that may be on this item
    let order = this.get('order'); // shouldn't make a request

    // do we have a discount to apply?
    let host = order.get('host');
    let discounts = host.get('membershipDiscounts');

    // no discounts, no change in price
    if (!Ember.isPresent(discounts)) return total;

    // check for a membership option, which may include a discount
    let lineItems = order.get('lineItems');
    let hasMembershipInOrder = lineItems.any((item, index, enumerable) => {
      return item.get('lineItem.isMembershipOption')
    });

    // make sure membership status is present / true
    // this could be from the order or pre-existing membership status
    if (!hasMembershipInOrder) return total;

    // currently, only lessons are supported for this type of discount
    discounts.forEach((discount, index, enumerable) => {
      if (discount.get('appliesTo').indexOf('Lesson') != -1){
        order.get('lineItems').forEach((orderLineItem, index, enumerable) => {
          if (orderLineItem.get('lineItem.isLesson')){
            // apply the discount
            let quantity = orderLineItem.get('quantity');
            let price = orderLineItem.get('lineItem.price');
            total = discount.applyToAmount(price, quantity);
          }

        });
      }
    });

    return total;
  }
});
