import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('host', {
  default: {
    id: i => `event-${i.id}`,
    name: i => `Event ${i.id}`,
    domain: i => `event-${i.id}`,
    subdomain: i => `event-${i.id}`
  }
});
