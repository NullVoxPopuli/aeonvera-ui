import Ember from 'ember';

/*
  The stripe script sends a submit action to it's containing form.
  So, we must have a form.

  A stripe form requires an event, and an order.

  event:
    - id and class name to send to the rails server to scope the order by
    - the integration for the publishable key
    - description of purchase (event name)
  order:
    - for getting the amount due, and for using the id to update the server
    - for email to send a receipt

  given an order, all 3 of the above objects should be available
*/
export default Ember.Component.extend({

  host: function(){
    return this.get('model').get('host');
  }.property('model'),

  image: function(){
    return this.get('host.loguUrlMedium');
  }.property('host'),

  key: function(){
    return this.get('host.stripePublishableKey');
  }.property('host'),

  emailForReceipt: function(){
    return this.get('model.userEmail');
  }.property('model'),

  description: function(){
    return this.get('host.name');
  }.property('host'),

  amountInCents: function(){
    return (this.get('model.totalInCents') || (this.get('model.subTotal') * 100));
  }.property('model'),

  actions: {
    /**
     * Receives a Stripe token after checkout succeeds
     * The token looks like this https://stripe.com/docs/api#tokens
     */
    processStripeToken: function(args){
      this.get('targetObject').send('processStripeToken', args);
    }
  }

});
