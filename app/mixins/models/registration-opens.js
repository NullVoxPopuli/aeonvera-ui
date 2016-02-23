import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Mixin.create({
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
