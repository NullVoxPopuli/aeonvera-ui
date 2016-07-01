import Ember from 'ember';
import DS from 'ember-data';

const { isBlank, computed } = Ember;

export default DS.Model.extend({
  name: DS.attr('string'),
  registrationOpensAt: DS.attr('date'),
  startsAt: DS.attr('date'),
  endsAt: DS.attr('date'),
  location: DS.attr('string'),
  url: DS.attr('string'),
  logoUrl: DS.attr('string'),
  logoUrlThumb: DS.attr('string'),
  logoUrlMedium: DS.attr('string'),

  isRegistrationOpen: computed('registrationOpensAt', function() {
    let registrationOpensAt = this.get('registrationOpensAt');

    // registration opening depends on the opening tier
    // the opening tier is required,
    // but this is handled on the server side.
    // Here we are making sure we don't error.
    if (isBlank(registrationOpensAt)) {
      return false;
    }

    // getTime() gets the integer representation of time.
    var opensAt = registrationOpensAt.getTime();
    var currently = Date.now();
    return (currently > opensAt);
  }),

  logoIsMissing: Ember.computed('logoUrl', function() {
    let logoUrl = this.get('logoUrl');
    let logoPresent = Ember.isPresent(logoUrl);
    return logoPresent ? logoUrl.indexOf('missing') !== -1 : true;
  }),
});
