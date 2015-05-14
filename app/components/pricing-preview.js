import Ember from 'ember';

export default Ember.Component.extend({
	didInsertElement: function() {
		this.send('reCalculate', 75);
		this._super();
	},

	actions: {
		reCalculate: function(enteredValue) {
			var serviceFee = this.$("#serviceFee");
			var cardFee = this.$("#cardFee");
			var buyerPays = this.$("#buyerPays");
			var youGet = this.$("#youGet");
			var ticketPrice = this.$("#ticketPrice");
			var absorbFees = this.$("#absorbFees");

			var value = typeof enteredValue !== 'undefined' ? enteredValue :
				parseFloat(
					ticketPrice.val());

			if (isNaN(value)) {
				value = 0;
			}

			var serviceFeeValue = 0;
			var cardFeeValue = 0;
			var buyerPaysValue = 0;
			var youGetValue = 0;

			if (value > 0) {
				if (absorbFees.is(':checked')) {
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

			serviceFee.html(serviceFeeValue.toFixed(2));
			cardFee.html(cardFeeValue.toFixed(2));
			buyerPays.html(buyerPaysValue.toFixed(2));
			youGet.html(youGetValue.toFixed(2));


		}
	}

});
