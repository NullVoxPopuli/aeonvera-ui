import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('users/registration', {
  type: 'Users/Registration',

  default: {
    attendee: FactoryGuy.belongsTo('user')
  }

});
