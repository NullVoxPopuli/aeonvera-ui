import Ember from 'ember';

export default class extends Ember.Service {
  cardFeePercentage: number = 0.029;
  appFeePercentage: number = 0.0075;
  constantCardFee: number = 0.3;

  calculateForSubTotal(subTotal: any, absorbFees: boolean = false, allowNegative: boolean = false) {
    let value = parseFloat(subTotal);

    if (isNaN(value)) {
      value = 0;
    }

    let serviceFeeValue = 0;
    let cardFeeValue = 0;
    let buyerPaysValue = 0;
    let youGetValue = 0;

    if (allowNegative || value > 0) {
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

    return {
      // estimated - actual fee is calculated on the total
      // charging service fees hurts morale. Its best to
      // absort the fee.
      feesPaidByEvent: absorbFees,
      receivedByEvent: youGetValue.toFixed(2),
      subTotal: value.toFixed(2),
      cardFee: cardFeeValue.toFixed(2),
      applicationFee: serviceFeeValue.toFixed(2),
      totalFee: (cardFeeValue + serviceFeeValue).toFixed(2),
      total: buyerPaysValue.toFixed(2),
      buyerPays: buyerPaysValue.toFixed(2)
    };
  }
}
