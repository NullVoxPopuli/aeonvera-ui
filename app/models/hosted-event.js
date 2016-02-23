import DS from 'ember-data';
import LeadsAndFollows from '../mixins/models/has-leads-and-follows';
import RegistrationOpens from '../mixins/models/registration-opens';

export default DS.Model.extend(
  LeadsAndFollows,
  RegistrationOpens, {
  name: DS.attr('string'),
  registrationOpensAt: DS.attr('date'),
  numberOfShirtsSold: DS.attr('number'),
  myEvent: DS.attr('boolean'),
  startsAt: DS.attr('date'),
  endsAt: DS.attr('date')
});
