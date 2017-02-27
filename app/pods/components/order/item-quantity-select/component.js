import Ember from 'ember';

export default Ember.Component.extend({
  // passed in
  orderLineItem: null,

  // for access to the remove method
  order: null,

  quantity: Ember.computed.alias('orderLineItem.quantity'),

  actions: {
    increase() {
      const quantity = this.get('quantity');

      this.get('orderLineItem').set('quantity', quantity + 1);
    },

    decrease() {
      const quantity = this.get('quantity');
      const newQuantity = quantity - 1;
      const oli = this.get('orderLineItem');

      if (newQuantity < 1) {
        this.get('order').removeOrderLineItem(oli);
      } else {
        oli.set('quantity', newQuantity);
      }
    }
  }
});
