import Ember from 'ember';

export default Ember.Route.extend({

  model(params, transition) {
    return this.modelFor('register.checkout');
  },

  afterModel(order, transition) {
    if (order.get('paid')) {
      transition.abort();
      this.transitionTo('register.checkout.index', order);
    }
  }
});
