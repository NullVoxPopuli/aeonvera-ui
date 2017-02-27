import DS from 'ember-data';

export default DS.Model.extend({
  registrationTimes: DS.attr(),
  incomeTimes: DS.attr(),
  registrations: DS.attr(),
  incomes: DS.attr(),
  rootNode: DS.attr()
});
