import DS from 'ember-data';

export default DS.Model.extend({
  firstName: DS.attr('string'),
  lastSame: DS.attr('string'),
  email: DS.attr('string'),
  password: DS.attr('string'),
  passwordConfirmation: DS.attr('string')
});
