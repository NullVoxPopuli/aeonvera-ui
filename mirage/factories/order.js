/*
  This is an example factory definition.

  Create more files in this directory to define additional factories.
*/
import Mirage, {
  faker
}
from 'ember-cli-mirage';

export default Mirage.Factory.extend({

  // age: 20,                              // numbers
  // tall: true,                           // booleans

  // email: function(i) {                  // and functions
  //   return 'person' + i + '@test.com';
  // },

  // zipCode: faker.address         .zipCode
});
