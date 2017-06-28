/*
  This is an example factory definition.

  Create more files in this directory to define additional factories.
*/
import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  firstName: faker.name.firstName, // using faker
  lastName: faker.name.firstName,
  email: 'test@test.test',
  password: 'some-password',
  token: faker.internet.ipv6,
  resetPasswordToken: faker.internet.ipv6,

  // age: 20,                              // numbers
  // tall: true,                           // booleans

  // email: function(i) {                  // and functions
  //   return 'person' + i + '@test.com';
  // },

  // zipCode: faker.address         .zipCode
});
