import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  registrationOpensAt: DS.attr('date'),
  startsAt: DS.attr('date'),
  endsAt: DS.attr('date'),
  location: DS.attr('string'),
  url: DS.attr('string'),

  isRegistrationOpen: function() {
    var opensAt = this.get('registrationOpensAt').getTime();
    var now = Date.now;
    return (now > opensAt);
  }.property('registrationOpensAt')
});
