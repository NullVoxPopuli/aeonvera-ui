import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  registrationId: DS.attr('number'),
  numberOfTicketsPurchased: DS.attr('number')
});
