import Ember from 'ember';

/*
  The model passed in to this component must be
  an order
*/
export default Ember.Component.extend({
  title: 'Choose Payment Method',


  checkNumber: '',

  order: function(){
    return this.get('model');
  }.property('model'),

  amount: function(){
    return this.get('order.subTotal');
  }.property('order', 'order.subTotal'),

  actions: {
    process: function(paymentMethod){
      this.get('targetObject').send('process', {
        checkNumber: this.get('checkNumber'),
        paymentMethod: paymentMethod
      });
    },

    processStripeToken: function(args){
      this.get('targetObject').send('processStripeToken', args);
    }
  }

});
