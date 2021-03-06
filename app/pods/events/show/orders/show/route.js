import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('order', params.order_id);
  },

  actions: {
    afterDelete() {
      this.transitionTo('events.show.orders');
    }
  }
});
