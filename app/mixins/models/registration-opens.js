import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Mixin.create({
  isRegistrationOpen: function() {
    const open = this.get('hasRegistrationOpened');
    const ended = this.get('hasEnded');

    return (open && !ended);
  }.property('registrationOpensAt', 'endsAt'),

  hasRegistrationOpened: function() {
    const registrationOpensAt = this.get('registrationOpensAt');

    if (Ember.isPresent(registrationOpensAt)) {
      const opensAt = registrationOpensAt.getTime();
      const currently = Date.now();

      return (currently > opensAt);
    }

    return false;
  }.property('registrationOpensAt'),

  hasEnded: function() {
    const endedAt = this.get('endsAt').getTime();
    const currently = Date.now();

    return (currently > endedAt);
  }.property('endsAt')
});
