import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('event', {
  default: {
    name: i => `Event ${i.id}`,
    domain: i => `event-${i.id}`
  }
});
