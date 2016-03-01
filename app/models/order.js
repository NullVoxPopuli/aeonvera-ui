import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  hostName: DS.attr('string'),
  hostUrl: DS.attr('string'),
  createdAt: DS.attr('date'),
  paymentReceivedAt: DS.attr('date'),
  paidAmount: DS.attr('number'),
  netAmountReceived: DS.attr('number'),
  totalFeeAmount: DS.attr('number'),
  paymentMethod: DS.attr('string'),
  checkNumber: DS.attr('string'),
  paid: DS.attr('boolean'),

  totalInCents: DS.attr('number'),

  userEmail: DS.attr('string'),
  userName: DS.attr('string'),

  host: DS.belongsTo('host', {
    polymorphic: true,
  }),
  orderLineItems: DS.hasMany('orderLineItem', {
    async: true,
  }),
  attendance: DS.belongsTo('attendance'),

  lineItems: Ember.computed.alias('orderLineItems'),

  /*
    stripe specific things
    TODO: think about extracting this in to an object,
    and saving all of the toke info (like IP, maybe other stuff)
  */
  checkoutToken: DS.attr('string'),
  checkoutEmail: DS.attr('string'),

  paidText: function() {
    return this.get('paid') ? 'Yes' : 'No';
  }.property('paid'),

  /* aliases */
  event: function() {
    return this.get('host');
  }.property('host'),

  totalInDollars: function() {
    return this.get('totalInCents') / 100;
  }.property('totalInCents'),

  hasLineItems: Ember.computed('lineItems.@each', function() {
    return this.get('lineItems.length') > 0;
  }),

  /*
    Calculates raw total of all the order line items
  */
  subTotal: function() {
    let lineItems = this.get('lineItems');
    let subTotal = 0;

    lineItems.forEach(function(item) {
      subTotal += item.get('total');
    });

    return subTotal;
  }.property('lineItems.@each.total'),

  paidClass: function() {
    let paid = this.get('paid');
    return paid ? 'success-color' : 'alert-color';
  }.property('paid'),

  /*
    takes the line item, and makes an order line item out of it
  */
  addLineItem: function(lineItem, quantity = 1, price = null) {
    price = price ? price : lineItem.get('currentPrice');
    quantity = parseInt(quantity) || 0;

    // is the item already in the order?
    let orderLineItem = this.getOrderLineItemMatching(lineItem, price);

    if (quantity > 0 && !Ember.isPresent(orderLineItem)) {
      orderLineItem = this.get('lineItems').createRecord({
        lineItem: lineItem,
        price: price,
        quantity: quantity,
      });

      this.get('lineItems').pushObject(orderLineItem);
    } else {
      // increase quantity
      quantity = quantity ? quantity : orderLineItem.get('quantity') + 1;
      if (quantity === "0" || quantity === 0) {
        this.removeOrderLineItem(orderLineItem)
      } else {
        orderLineItem.set('quantity', quantity);
      }
    }

  },

  getOrderLineItemMatching(lineItem, price) {
    let orderLineItems = this.get('lineItems');
    let result = null;
    orderLineItems.forEach((orderLineItem, index, enumerable) => {
      let currentLineItem = orderLineItem.get('lineItem');
      let currentPrice = orderLineItem.get('price');
      if (currentPrice === price && currentLineItem.get('id') ===
        lineItem.get('id')) {
        result = orderLineItem;
        return;
      }
    });

    return result;
  },

  hasLineItem: function(lineItem) {
    let lineItems = this.get('lineItems');
    let items = lineItems.mapBy('lineItem');
    let flattenedItems = items.reduce(function(a, b) {
      return a.concat(b);
    }, []);

    return flattenedItems.contains(lineItem);
  },

  removeOrderLineItem: function(orderLineItem) {
    this.get('lineItems').removeObject(orderLineItem);
    if (Ember.isPresent(orderLineItem)) {
      orderLineItem.destroyRecord();
    }
  },

  /*
    stripe data doesn't need to be kept on the model, but is important for
    record keeping and eventual refunds
    - it might actually become available on when refunds are implemented,
      but I don't know how that's going to work yet
  */
  markPaid: function(paymentMethod, checkNumber = null, stripeData = null) {
    /*
      orders can't be changed once paid.
      - for refunds, a refund object should be associated
      - does this mean there should be a set of transactions on an order?
        which include payments and refunds?
    */
    if (!this.get('paid')) {
      /*
        any other monetary properties are set by the server
      */
      this.setProperties({
        paymentMethod: paymentMethod,
        checkNumber: checkNumber,
        paid: true,
        paidAmount: this.get('subTotal'),
        stripeData: stripeData,
      });
    }
  },

});
