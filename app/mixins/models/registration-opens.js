import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Mixin.create({
  isRegistrationOpen: function () {
    var open = this.get('hasRegistrationOpened');
    var ended = this.get('hasEnded');

    return (open && !ended);
  }.property('registrationOpensAt', 'endsAt'),

  hasRegistrationOpened: function () {
    let registrationOpensAt = this.get('registrationOpensAt');
    if (Ember.isPresent(registrationOpensAt)){
      var opensAt = registrationOpensAt.getTime();
      var currently = Date.now();
      return (currently > opensAt);
    }

    return false;
  }.property('registrationOpensAt'),

  hasEnded: function () {
    var endedAt = this.get('endsAt').getTime();
    var currently = Date.now();
    return (currently > endedAt);
  }.property('endsAt'),
});
