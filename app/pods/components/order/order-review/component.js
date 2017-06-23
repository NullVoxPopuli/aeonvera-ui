import Ember from 'ember';
import computed, { filterBy } from 'ember-computed-decorators';

export default Ember.Component.extend({
  @filterBy('model.orderLineItems', 'isNew', false) savedLineItems,

  // 1. Fee Exists
  // 2. SubTotal and Total are different
  @computed(
    'model.shouldApplyFee', 'model.fee',
    'model.subTotal', 'model.total', 'model.paid')
  displayFee(shouldApplyFee, fee, subTotal, total, paid) {
    if (parseFloat(subTotal) === parseFloat(total)) return false;

    const result = (paid && fee > 0) || shouldApplyFee;

    return result;
  },

  actions: {
    removeItem(item) {
      const order = this.get('model');

      order.removeOrderLineItem(item);
    }
  }
});
