import DS from 'ember-data';
import LeadsAndFollows from '../mixins/models/has-leads-and-follows';

export default DS.Model.extend(LeadsAndFollows, {
  name: DS.attr('string'),
  registrationOpensAt: DS.attr('date'),
  numberOfShirtsSold: DS.attr('number'),
  myEvent: DS.attr('boolean'),
  startsAt: DS.attr('date'),
  endsAt: DS.attr('date'),

  isRegistrationOpen: function() {
    var open = this.get('hasRegistrationOpened');
    var ended = this.get('hasEnded');

    return (open && !ended);
  }.property('registrationOpensAt', 'endsAt'),

  hasRegistrationOpened: function() {
    var opensAt = this.get('registrationOpensAt').getTime();
    var currently = Date.now();
    return (currently > opensAt);
  }.property('registrationOpensAt'),

  hasEnded: function() {
    var endedAt = this.get('endsAt').getTime();
    var currently = Date.now();
    return (currently > endedAt);
  }.property('endsAt')
});
