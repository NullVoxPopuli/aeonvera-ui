import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  domain: DS.attr('string'),

  integrations: DS.hasMany('integration'),
  hasStripeIntegration: DS.attr('boolean'),

  stripePublishableKey: function() {
    /*
    			TODO: find a way to make the 'stripe' key not a string somehow
    			so typing it over and over doesn't lead to silent errors
    		*/
    var integrations = this.get('integrations').filterBy('name', 'stripe');
    var stripeIntegration = null;

    if (integrations.length > 0) {
      stripeIntegration = integrations[0];
    }

    var isPresent = Ember.isPresent(stripeIntegration);

    if (isPresent){
      return stripeIntegration.get('publishableKey');
    }

    return null;
  }.property('integrations.[]'),

  isOrganization: Ember.computed(function() {
    return this.get('constructor.modelName') === 'organization';
  }),

  isCommunity: Ember.computed(function(){
    return this.get('isOrganization');
  }),

  isEvent: Ember.computed(function(){
    return this.get('constructor.modelName') === 'event';
  }),
});
