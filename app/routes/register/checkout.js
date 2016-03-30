import Ember from 'ember';

export default Ember.Route.extend({

  model: function (params) {
    return this.get('store').findRecord('order', params.orderId, {
      adapterOptions: {
        query: {
          include: 'order_line_items.line_item,host.integrations'
        }
      }
    });
  },

});