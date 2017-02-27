import Ember from 'ember';

export default Ember.Route.extend({

  model: function(params, transition) {
    const order = this.modelFor('register.checkout');

    order.removeItemsWithNullIds();
    return order;
  }

});
