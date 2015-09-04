import DS from 'ember-data';

export default DS.Model.extend({
  lineItem: DS.belongsTo('line-item', { polymorphic: true }),
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



  name: function(){
    return this.get('lineItem').get('name');
  }.property('lineItem'),

  total: function(){
    let price = this.get('price'),
        quantity = this.get('quantity');

    return price * quantity;
  }.property('price', 'quantity'),

  isCompetition: function(){
    return (this.get('lineItem').get('constructor.typeKey') === 'competition');
  }.property('lineItem', 'lineItemType')

});
