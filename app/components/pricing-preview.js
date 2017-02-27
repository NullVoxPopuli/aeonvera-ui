import Ember from 'ember';

export default Ember.Component.extend({
  priceCalculator: Ember.inject.service(),

  absorbFees: false,
  serviceFee: 0,
  cardFee: 0,
  buyerPays: 0,
  youGet: 0,
  ticketPrice: 0,
  enteredValue: 75,

  enteredValueChanged: Ember.observer('enteredValue', 'absorbFees', function() {
    this.send('reCalculate');
  }),

  didInsertElement: function() {
    this.send('reCalculate');
    this._super();
  },

  actions: {
    reCalculate: function() {
      const enteredValue = this.get('enteredValue');
      const absorbFees = this.get('absorbFees');

      const calculator = this.get('priceCalculator');
      const value = calculator.calculateForSubTotal(enteredValue, absorbFees);

      this.set('serviceFee', value.applicationFee);
      this.set('cardFee', value.cardFee);
      this.set('buyerPays', value.buyerPays);
      this.set('youGet', value.receivedByEvent);
    }
  }

});
