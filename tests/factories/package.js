import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('package', {
  default: {
  },

  traits: {
    withPurchases: {
      orderLineItems: FactoryGuy.hasMany('order-line-item', 10)
    }
  }
});
