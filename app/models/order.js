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

  hasLineItems: Ember.computed('orderLineItems.@each', function() {
    return this.get('orderLineItems.length') > 0;
  }),

  /*
    Calculates raw total of all the order line items
  */
  subTotal: function() {
    let lineItems = this.get('orderLineItems');
    let subTotal = 0;

    lineItems.forEach((item) => {
      subTotal += item.get('total');
    });

    return subTotal;
  }.property('orderLineItems.@each.total'),

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
      this._addNewLineItem(lineItem, quantity, price);
    } else {
      // this will also remove
      this._increaseQuantityForItem(lineItem, orderLineItem, quantity);
    }

    if (!lineItem.get('isADiscount')) {
      this._updateAutomaticDiscounts();
    }
  },

  /*
    Currently, only membership discounts are applied
    - these are applied to lessons right now, but
    - TODO: add support for auto-applying membership
            discounts to events as well
  */
  _updateAutomaticDiscounts() {
    if (!this._eligibleForDiscount()) return;

    let discounts = this.get('host.membershipDiscounts');
    let items = this.get('orderLineItems');
    let activeDiscounts = items.filterBy('lineItem.isADiscount');
    let activeNonDiscounts = items.filterBy('lineItem.isADiscount', false);

    // let activeDiscounts = items.any((item, i, e) => {
    //   return item.get('lineItem.isADiscount');
    // });

    if (activeNonDiscounts.get('length') > 0) {
      discounts.forEach((discount, i, e) => {
        // only check discounts for lessons for now
        if (discount.get('appliesTo').indexOf('Lesson') != -1) {
          let numberOfLessons = 0;
          activeNonDiscounts.forEach((orderLineItem, i, e) => {
            if (orderLineItem.get('lineItem.isLesson')) {
              // apply the discount
              let quantity = orderLineItem.get('quantity');

              numberOfLessons += quantity;
            }
          });

          if (numberOfLessons > 0) {
            this.addLineItem(discount, numberOfLessons);
          }
        }
      });
    } else {
      // we can't have just discounts -- remove everything
      activeDiscounts.forEach((discount, i, e) => {
        this.removeOrderLineItem(discount);
      });
    }
  },

  _eligibleForDiscount() {
    let host = this.get('host');
    let discounts = host.get('membershipDiscounts');

    // no discounts, no change in price
    if (!Ember.isPresent(discounts)) return false;

    // check for a membership option, which may include a discount
    let lineItems = this.get('orderLineItems');
    let hasMembership = lineItems.any((item, index, enumerable) => {
      return item.get('lineItem.isMembershipOption');
    });

    // check if the user is a member
    let user = this.get('user.id');

    // refetch, to ensure we get all the helper methods defined on user.
    // TODO: WTF?
    user = this.get('store').peekRecord('user', 0);

    if (!hasMembership && Ember.isPresent(user)) {
      hasMembership = user.isMemberOf(host);
    }

    // make sure membership status is present / true
    // this could be from the order or pre-existing membership status
    return hasMembership;
  },

  /*
    only valid data should be passed to this method.
    from addLineItem
  */
  _addNewLineItem(lineItem, quantity, price) {
    if (lineItem.get('isADiscount')) {
      price = 0 - lineItem.get('amount');
    }

    let orderLineItem = this.get('orderLineItems').createRecord({
      lineItem: lineItem,
      price: price,
      quantity: quantity,
    });

    this.get('orderLineItems').pushObject(orderLineItem);
  },

  /*
    only valid data should be passed to this method.
    from addLineItem
  */
  _increaseQuantityForItem(lineItem, orderLineItem, quantity) {
    // weird logic, cause 0 is false
    quantity = (quantity || quantity == 0) ? quantity : orderLineItem.get(
      'quantity') + 1;
    if (quantity === '0' || quantity === 0) {
      this.removeOrderLineItem(orderLineItem);
    } else {
      orderLineItem.set('quantity', quantity);
    }
  },

  getOrderLineItemMatching(lineItem, price) {
    let orderLineItems = this.get('orderLineItems');
    let result = null;

    orderLineItems.forEach((orderLineItem, index, enumerable) => {
      let currentLineItem = orderLineItem.get('lineItem');
      let currentPrice = orderLineItem.get('price');
      let isDiscount = currentLineItem.get('isADiscount');


      if (currentLineItem.get('id') === lineItem.get('id') && (
          currentPrice === price || isDiscount)) {
        result = orderLineItem;
        return;
      }
    });

    return result;
  },

  hasLineItem: function(lineItem) {
    let lineItems = this.get('orderLineItems');
    let items = lineItems.mapBy('lineItem');
    let flattenedItems = items.reduce(function(a, b) {
      return a.concat(b);
    }, []);

    return flattenedItems.contains(lineItem);
  },

  removeOrderLineItem: function(orderLineItem) {
    this.get('orderLineItems').removeObject(orderLineItem);
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
