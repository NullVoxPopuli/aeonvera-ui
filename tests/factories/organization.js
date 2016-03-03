import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('organization', {
  extends: 'host',
  default: {
    type: 'organization'
  }
});
