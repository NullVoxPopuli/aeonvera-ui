import Ember from 'ember';

export default Ember.Route.extend({

  model: function (params, transition) {
    let order = this.modelFor('register.checkout');
    order.removeItemsWithNullIds();
    return order;
  },

});
