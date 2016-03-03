import Ember from 'ember';

export default Ember.Component.extend({
  orderLineItems: [],

  templateFor: function (item) {
    let kind = item.get('constructor.modelName');
    if (kind === 'discount') {
      return 'registrant/order/line-item-' + kind + '-row';
    }

    return 'registrant/order/line-item-row';
  },

  setTemplate: function () {
    let items = this.get('model.orderLineItems');

    items.then(lineItems => {
      lineItems.forEach((orderLineItem, i) => {
        orderLineItem.get('lineItem').then(item => {
          let template = self.templateFor(item);
          orderLineItem.set('template', template);
        });
      });
      this.set('orderLineItems', lineItems);
    });

  }.observes('model.orderLineItems.[]'),

  actions: {
    resendReceipt: function () {

    },
  },
});
