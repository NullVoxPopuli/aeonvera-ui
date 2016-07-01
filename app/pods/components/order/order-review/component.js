import Ember from 'ember';

export default Ember.Component.extend({
  displayFee: Ember.computed(
    'model.shouldApplyFee',
    'fee',  'model.subTotal', function() {
    let shouldApplyFee = this.get('model.shouldApplyFee');
    let fee = this.get('model.fee');
    let paid = this.get('model.paid');

    let subTotal = this.get('model.subTotal');
    let total = this.get('model.total');

    if (parseFloat(subTotal) === parseFloat(total)) {
      return false;
    }

    let result = (paid && fee > 0) || shouldApplyFee;
    return result;
  }),

  actions: {
    removeItem(item) {
      let order = this.get('model');
      order.removeOrderLineItem(item);
    }
  }
});
