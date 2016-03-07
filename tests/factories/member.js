import FactoryGuy from 'ember-data-factory-guy';
import user from './user';

FactoryGuy.define('member', {
  extends: 'user',
  default: {
    type: 'member'
  }
});
