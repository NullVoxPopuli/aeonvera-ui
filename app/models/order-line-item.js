import DS from 'ember-data';

export default DS.Model.extend({
  lineItem: DS.belongsTo('line-item', {
    async: true,
    polymorphic: true,
    params: {
      event_id: 'hasManyParams'
    }
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

  // TODO: this is a hack, couple with an adapter hack
  // check ember data later if it can do hasMany query params
  hasManyParams: function() {
    let id = this.get('order.event.id');
    return {
      'event_id': id
    };
  }.property(),

  priceNeedsChanging: function() {
    let lineItem = this.get('lineItem');
    let size = this.get('size');
    let sizePrice = lineItem.priceForSize(size);
    this.set('price', sizePrice);
  }.observes('size'),

  name: function() {
    return this.get('lineItem').get('name');
  }.property('lineItem'),

  total: function() {
    let price = this.get('price'),
      quantity = this.get('quantity');

    return price * quantity;
  }.property('price', 'quantity'),

  isCompetition: function() {
    return (this.get('lineItem').get('constructor.typeKey') ===
      'competition');
  }.property('lineItem', 'lineItemType'),

  isShirt: function() {
    return (this.get('lineItem').get('constructor.typeKey') === 'shirt');
  }.property('lineItem', 'lineItemType')



});
