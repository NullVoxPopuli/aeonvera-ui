import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  registrationOpensAt: DS.attr('date'),
  startsAt: DS.attr('date'),
  endsAt: DS.attr('date'),
  location: DS.attr('string'),
  url: DS.attr('string'),

  date_of_event: function(){
    return this.get('startsAt') + " - " + this.get('endsAt');
  }.property('startsAt', 'endsAt')
});
