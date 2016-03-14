import Ember from 'ember';

export default Ember.Component.extend({
  absorbFees: false,
  serviceFee: 0,
  cardFee: 0,
  buyerPays: 0,
  youGet: 0,
  ticketPrice: 0,
  enteredValue: 75,

  enteredValueChanged: Ember.observer('enteredValue', 'absorbFees', function(){
    this.send('reCalculate');
  }),

  didInsertElement: function () {
    this.send('reCalculate');
    this._super();
  },

  actions: {
    reCalculate: function () {
      let enteredValue = this.get('enteredValue');
      let absorbFees = this.get('absorbFees');

      var value = parseFloat(enteredValue);

      if (isNaN(value)) {
        value = 0;
      }

      let serviceFeeValue = 0;
      let cardFeeValue = 0;
      let buyerPaysValue = 0;
      let youGetValue = 0;

      if (value > 0) {
        if (absorbFees) {
          serviceFeeValue = value * 0.0075;
          cardFeeValue = value * 0.029 + 0.3;
          buyerPaysValue = value;
          youGetValue = buyerPaysValue - serviceFeeValue - cardFeeValue;
        } else {
          youGetValue = value;
          buyerPaysValue = (
          (youGetValue + 0.3) / (1 - (0.029 + 0.0075))
          );

          serviceFeeValue = buyerPaysValue * 0.0075;
          cardFeeValue = buyerPaysValue * 0.029 + 0.3;
        }
      }

      this.set('serviceFee', serviceFeeValue.toFixed(2));
      this.set('cardFee', cardFeeValue.toFixed(2));
      this.set('buyerPays', buyerPaysValue.toFixed(2));
      this.set('youGet', youGetValue.toFixed(2));
    },
  },

});
