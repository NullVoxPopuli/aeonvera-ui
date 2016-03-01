import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service('store'),
  order: null,
  host: null,

  hasItems: Ember.computed('order', 'order.hasLineItems', function() {
    let order = this.get('order');
    return (Ember.isPresent(order) && order.get('hasLineItems'));
  }),


  add(item, quantity = 1) {
    let order = this.get('order');

    if (!Ember.isPresent(order)) {
      order = this.get('store').createRecord('order', {
        host: this.get('host')
      });

      this.set('order', order);
    }

    this.get('order').addLineItem(item, quantity);
  },

  remove(item) {
    let order = this.get('order');
    order.removeOrderLineItem(item);

    if (!order.get('hasLineItems')) {
      this.cancel();
    }
  },


  cancel() {
    this.get('order').unloadRecord();
    this.set('order', null);
  },

  submit() {

  },

  processStripeToken() {

  },

  process() {

  }

});
