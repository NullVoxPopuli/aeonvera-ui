import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  cart:  Ember.inject.service('order-cart'),

  lookupDiscount(host, discountCode) {
    let store = this.get('store');
    let cart = this.get('cart');

    return store.query('discount', {

      // for future, when this may be used for non-events?
      host_id: host.get('id'),
      host_type: host.get('klass'),

      // currently, event_id is required, because discounts
      // are only on events
      event_id: host.get('id'),
      include: 'restraints',
      q: {
        name_eq: discountCode
      }
    });
  },
});
