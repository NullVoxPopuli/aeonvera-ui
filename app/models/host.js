import Ember from 'ember';
import DS from 'ember-data';
import attr from 'ember-data/attr';
import File from 'ember-data-paperclip/objects/file';

export default DS.Model.extend({
  name: attr('string'),
  domain: attr('string'),
  website: attr('string'),
  logo: attr('file', { defaultValue: function() {
    return File.create();
  } }),
  contactEmail: attr('string'),

  integrations: DS.hasMany('integration'),
  hasStripeIntegration: DS.attr('boolean'),
  makeAttendeesPayFees: DS.attr('boolean', { defaultValue: false }),
  acceptOnlyElectronicPayments: DS.attr('boolean', { defaultValue: true }),

  logoFileName: DS.attr('string'),
  logoFileSize: DS.attr('number'),
  logoUpdatedAt: DS.attr('date'),
  logoUrl: DS.attr('string'),
  logoUrlThumb: DS.attr('string'),
  logoUrlMedium: DS.attr('string'),

  stripeIntegration: Ember.computed('integrations.@each', function() {
    const integrations = this.get('integrations').filterBy('name', 'stripe');
    let stripeIntegration = null;

    if (integrations.length > 0) {
      stripeIntegration = integrations[0];
    }

    return stripeIntegration;
  }),

  stripePublishableKey: function() {
    /*
      TODO: find a way to make the 'stripe' key not a string somehow
            so typing it over and over doesn't lead to silent errors
    */
    const stripeIntegration = this.get('stripeIntegration');

    const isPresent = Ember.isPresent(stripeIntegration);

    if (isPresent) {
      return stripeIntegration.get('publishableKey');
    }

    return null;
  }.property('integrations.@each'),

  isOrganization: Ember.computed(function() {
    return this.get('constructor.modelName') === 'organization';
  }),

  isEvent: Ember.computed(function() {
    return this.get('constructor.modelName') === 'event';
  }),

  // This corresponds to the server-side model name.
  // TODO: find a better way to do this.
  payableType: Ember.computed(function() {
    return this.get('isEvent') ? 'Event' : 'Organization';
  }),

  logoIsMissing: Ember.computed('logoUrl', function() {
    const logoUrl = this.get('logoUrl');
    const logoPresent = Ember.isPresent(logoUrl);

    return logoPresent ? logoUrl.indexOf('missing') !== -1 : true;
  })
});
