import DS from 'ember-data';

export default DS.Model.extend({
  hostName: DS.attr('string'),
  hostUrl: DS.attr('string'),
  createdAt: DS.attr('date'),
  paidAmount: DS.attr('number'),
  netAmountReceived: DS.attr('number'),
  totalFeeAmount: DS.attr('number'),
  paymentMethod: DS.attr('string'),
  checkNumber: DS.attr('string'),
  paid: DS.attr('boolean'),

  totalInCents: DS.attr('number'),

  userEmail: DS.attr('string'),

  host: DS.belongsTo('host', {
    polymorphic: true
  }),
  orderLineItems: DS.hasMany('orderLineItem', {
    async: true
  }),
  attendance: DS.belongsTo('attendance'),

  /*
    stripe specific things
    TODO: think about extracting this in to an object,
    and saving all of the toke info (like IP, maybe other stuff)
  */
  checkoutToken: DS.attr('string'),
  checkoutEmail: DS.attr('string'),



  /* aliases */
  event: function() {
    return this.get('host');
  }.property('host'),

  totalInDollars: function() {
    return this.get('totalInCents') / 100;
  }.property('totalInCents'),

  hasLineItems: function() {
    return this.get('lineItems').length > 0;
  }.property('lineItems.[]'),

  /*
    Calculates raw total of all the order line items
  */
  subTotal: function() {
    let lineItems = this.get('lineItems'),
      subTotal = 0;

    lineItems.forEach(function(item) {
      subTotal += item.get('total');
    });

    return subTotal;
  }.property('lineItems.[].price'),

  /*
    takes the line item, and makes an order line item out of it
  */
  addLineItem: function(lineItem, quantity = 1, price = lineItem.get(
    'currentPrice')) {
    let orderLineItem = this.get('lineItems').createRecord({
      lineItem: lineItem,
      price: price,
      quantity: quantity
    });

    this.get('lineItems').pushObject(orderLineItem);
  },

  removeOrderLineItem: function(orderLineItem) {
    this.get('lineItems').removeObject(orderLineItem);
    orderLineItem.destroyRecord();
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
        stripeData: stripeData
      });
    }
  }

});
