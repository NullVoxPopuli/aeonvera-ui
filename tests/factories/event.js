import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('event', {
  default: {
    name: i => `Event ${i.id}`,
    domain: i => `event-${i.id}`,
    openingTier: FactoryGuy.belongsTo('pricing-tier', { date: new Date(2016, 7) })
  }
});
