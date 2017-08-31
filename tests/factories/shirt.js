import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('shirt', {
  default: {
    sizes: []
  },

  traits: {
    withPurchases: {
      orderLineItems: FactoryGuy.hasMany('order-line-item', 10)
    }
  }
});
