import Ember from 'ember';

export default Ember.Component.extend({
  name: function() {
    return 'ÆONVERA';
  }.property(),

  image: function() {
    return '';
  }.property(),

  key: function() {
    return this.get('pk_live_HVTBz4vzGjoT5XhWA7y2w5hy');
  }.property(),

  emailForReceipt: function() {
    return '';
  }.property(),

  description: function() {
    return 'Development Encouragment Donation';
  }.property(),

  amountInCents: function() {
    return this.get('amount');
  }.property('amount'),

  actions: {
    /**
     * Receives a Stripe token after checkout succeeds
     * The token looks like this https://stripe.com/docs/api#tokens
     */
    processStripeToken: function(args) {
      //this.get('targetObject').send('processStripeToken', args);
    }
  }

});
