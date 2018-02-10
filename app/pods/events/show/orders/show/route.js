import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.store.findRecord('order', params.order_id);
  },

  actions: {
    afterDelete() {
      this.transitionTo('events.show.orders');
    }
  }
});
