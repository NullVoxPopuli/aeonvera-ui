import Ember from 'ember';

export default Ember.Component.extend({
  // 1. Fee Exists
  // 2. SubTotal and Total are different
  displayFee: Ember.computed(
    'model.shouldApplyFee',
    'fee', 'model.subTotal', function() {
      const shouldApplyFee = this.get('model.shouldApplyFee');
      const fee = this.get('model.fee');
      const paid = this.get('model.paid');

      const subTotal = this.get('model.subTotal');
      const total = this.get('model.total');

      if (parseFloat(subTotal) === parseFloat(total)) {
        return false;
      }

      const result = (paid && fee > 0) || shouldApplyFee;

      return result;
    }),

  actions: {
    removeItem(item) {
      const order = this.get('model');

      order.removeOrderLineItem(item);
    }
  }
});
