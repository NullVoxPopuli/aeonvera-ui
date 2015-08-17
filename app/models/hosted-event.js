import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  registrationOpensAt: DS.attr('date'),
  numberOfLeads: DS.attr('number'),
  numberOfFollows: DS.attr('number'),
  numberOfShirtsSold: DS.attr('number'),
  startsAt: DS.attr('date'),
  endsAt: DS.attr('date'),

  isRegistrationOpen: function() {
    var open = this.get('hasRegistrationOpened');
    var ended = this.get('hasEnded');

    return (open && !ended);
  }.property('registrationOpensAt', 'endsAt'),

  hasRegistrationOpened: function(){
    var opensAt = this.get('registrationOpensAt').getTime();
    var currently = Date.now();
    return (currently > opensAt);
  }.property('registrationOpensAt'),

  hasEnded: function(){
    var endedAt = this.get('endsAt').getTime();
    var currently = Date.now();
    return (currently > endedAt);
  }.property('endsAt'),

  totalAttendees: function(){
    var leads = this.get('numberOfLeads');
    var follows = this.get('numberOfFollows');

    return leads + follows;
  }.property('numberOfLeads', 'numberOfFollows')
});
