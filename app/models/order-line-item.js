import DS from 'ember-data';

export default DS.Model.extend({
  lineItem: DS.belongsTo('line-item', { polymorphic: true }),
  order: DS.belongsTo('order'),
  quantity: DS.attr('number'),
  price: DS.attr('number'),

  name: function(){
    return this.get('lineItem').get('name');
  }.property('lineItem'),

  total: function(){
    let price = this.get('price'),
        quantity = this.get('quantity');

    return price * quantity;
  }.property('price', 'quantity')
});
