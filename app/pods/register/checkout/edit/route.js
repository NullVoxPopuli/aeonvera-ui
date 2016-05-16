import Ember from 'ember';

export default Ember.Route.extend({

  model(params, transition) {
    let order = this.modelFor('register.checkout');
    return order;
  },

  afterModel(order, transition) {
    if (order.get('paid')) {
      transition.abort();
      this.transitionTo('register.checkout.index', order);
    }
  }
});
