import Ember from 'ember';

export default Ember.Component.extend({
  cart: Ember.inject.service('order-cart'),
  email: Ember.computed.oneWay('cart.userEmail'),
  errors: Ember.computed('model.errors', function(){
    return this.get('model.errors');
  }),
  errorsPresent: Ember.computed('errors.@each', function(){
    return Ember.isPresent(this.get('errors'));
  }),


  actions: {
    finishedOrder() {
      this.get('router').transitionTo('register.thankyou');
    },

    hideError(){
      this.set('errorsPresent', false);
    },

    // processStripeToken(params) {
    //   this.get('cart').processStripeToken(params);
    // },

    /*
      the params here is the response from the stripe-checkout script.
      We'll want to add this in to the order before, and show some sort of visual
      feedback for processing, as this data only enables us to charge the card.
      The server will do the actual charging of the card.

      The only data we need from the stripe checkout object is the 'id'

      NOTE: The order should already be saved before entering this method.
    */
    processStripeToken(params) {
      let token = params.id;
      let order = this.get('model');
      order.set('checkoutToken', token);

      // by saving, the server is going to attempt to charge the card,
      //
      // if nothing has gone wrong with the payment
      // and an email will be sent to the registrant.
      //
      // if there are errors with the credit card,
      // the user must be notified
      order.save().then(record => {

        /*
          Display some sort of thankyou
          - TODO: in the email, there should probably be some sort of
                  readonly link to the order
        */

        // redirect to success
      }, error => {
        // model's error object is used.
      });
    }
  }
});
