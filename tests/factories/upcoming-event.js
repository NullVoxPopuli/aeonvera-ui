import FactoryGuy from 'ember-data-factory-guy';

import './event';

FactoryGuy.define('upcoming-event', {
  // extends: 'event',
  default: {
    name: i => `Event ${i.id}`,
    domain: i => `event-${i.id}`
  }
});
