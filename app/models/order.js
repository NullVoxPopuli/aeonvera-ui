import Ember from 'ember';
import DS from 'ember-data';
import Validator from '../mixins/model-validator';

export default DS.Model.extend(Validator, {
  hostName: DS.attr('string'),
  hostUrl: DS.attr('string'),
  createdAt: DS.attr('date'),
  paymentReceivedAt: DS.attr('date'),
  paidAmount: DS.attr('number'),
  netAmountReceived: DS.attr('number'),
  totalFeeAmount: DS.attr('number'),
  paymentMethod: DS.attr('string'),
  paymentToken: DS.attr('string'),
  checkNumber: DS.attr('string'),
  paid: DS.attr('boolean'),

  totalInCents: DS.attr('number'),

  // TODO: think about renaming these to what
  //       they are on the server: buyer_
  userEmail: DS.attr('string'),
  userName: DS.attr('string'),

  // buyerEmail: DS.attr('string'),
  // buyerName: DS.attr('string'),

  host: DS.belongsTo('host', { polymorphic: true }),
  orderLineItems: DS.hasMany('orderLineItem'),
  attendance: DS.belongsTo('attendance', { async: false }),
  user: DS.belongsTo('user'),

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

  shouldApplyFee: Ember.computed('subTotal', 'host.makeAttendeesPayFees', 'paymentMethod', function() {
    let electronicPayment = (
      this.get('paymentMethod') === 'stripe' ||
      this.get('host.acceptOnlyElectronicPayments') || false
    );

    let result = (
      this.get('subTotal') > 0 &&
      this.get('host.makeAttendeesPayFees') &&
      electronicPayment);

    return result;
  }),

  fee: Ember.computed('subTotal', function() {
    // total_fee_percentage = 0.029 # Stripe
    // total_fee_percentage += 0.0075 unless host.beta?
    //
    // total = (sub + 0.3) / (1 - total_fee_percentage).round(2)
    let subTotal = this.get('subTotal');
    let minFee = 0.3;
    let feePercentage = 0.029;
    let applicationFee = 0.0075;
    let totalFeePercentage = feePercentage + applicationFee;

    let stringFee = (subTotal * totalFeePercentage + minFee).toFixed(2);
    return parseFloat(stringFee);
  }),

  /*
    Calculates raw total of all the order line items
     - before fees or anything
  */
  subTotal: Ember.computed('orderLineItems.@each.total', function() {
    let lineItems = this.get('orderLineItems');
    let subTotal = 0;

    lineItems.forEach((item) => {
      subTotal += item.get('total');
    });

    return subTotal;
  }),

  total: Ember.computed('subTotal', 'shouldApplyFee', function() {
    let subTotal = this.get('subTotal');
    let shouldApplyFee = this.get('shouldApplyFee');
    let total = subTotal;

    if (shouldApplyFee) {
      let fee = this.get('fee');
      total += fee;
    }

    return total;
  }),

  paidClass: function() {
    let paid = this.get('paid');
    return paid ? 'success-color' : 'alert-color';
  }.property('paid'),

  /*
    takes the line item, and makes an order line item out of it
    lineItem - the item to add or update
    quantity - the quantity to *set* to. This does not add.
    price - overrides the price of the lineItem
  */
  addLineItem: function(lineItem, quantity = 1, price = null) {
    price = price ? price : lineItem.get('currentPrice');
    quantity = parseInt(quantity) || 0;

    if (lineItem.get('isPackage')) {
      // remove any old package
      // - 1 package per order
      this._setPackage(lineItem, price);
    } else {

      // is the item already in the order?
      let orderLineItem = this.getOrderLineItemMatching(lineItem, price);
      let oliExists = Ember.isPresent(orderLineItem);
      if (quantity > 0 && !oliExists) {
        this._addNewLineItem(lineItem, quantity, price);
      } else if (oliExists) {
        // this will also remove
        this._increaseQuantityForItem(lineItem, orderLineItem, quantity);
      }
    }

    if (!lineItem.get('isADiscount')) {
      this._updateAutomaticDiscounts();
    }
  },

  _setPackage(lineItem, price) {
    // remove old packages
    let orderLineItem = this._findFirstPackage();
    if (Ember.isPresent(orderLineItem)) {
      this.removeOrderLineItem(orderLineItem);
    }

    // add this package - can only have 1 (at least for now)
    this._addNewLineItem(lineItem, 1, price);

    // set the package on the attendance,
    // if the eattendance exists
    let attendance = this.get('attendance');
    if (Ember.isPresent(attendance)) {
      attendance.set('package', lineItem);
    }
  },

  _findFirstPackage() {
    let items = this.get('orderLineItems');
    let result = null;
    items.forEach(item => {
      let isPackage = item.get('lineItem.isPackage');
      if (isPackage) {
        return result = item;
      }
    });

    return result;
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

    if (activeNonDiscounts.get('length') > 0) {
      discounts.forEach((discount, i, e) => {
        // only check discounts for lessons for now
        let appliesTo = discount.get('appliesTo');
        if (Ember.isPresent(appliesTo) && appliesTo.indexOf('Lesson') !== -1) {
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
    let hasMembership = lineItems.any((item, i, e) => item.get(
      'lineItem.isMembershipOption'));

    // check if the user is a member
    let userId = this.get('user.id');

    // refetch, to ensure we get all the helper methods defined on user.
    // TODO: WTF?
    let user = this.get('store').peekRecord('user', userId);
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
    quantity = (quantity || quantity === 0) ? quantity : orderLineItem.get(
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

    orderLineItems.forEach((orderLineItem, i, e) => {
      let currentLineItem = orderLineItem.get('lineItem');

      // orderLineItem.get('lineItem').then((currentLineItem) => {})
      let currentPrice = orderLineItem.get('price');
      let isDiscount = currentLineItem.get('isADiscount');

      // doesn't work, because promise isn't resolved in test env.
      let isSameKind = lineItem.isTheSameKindAs(currentLineItem);

      if (
          // this needs to exist -- but breaks tests :-(
          // due to promises... GRRR
          //isSameKind &&
          currentLineItem.get('id') === lineItem.get('id') &&
          (currentPrice === price || isDiscount)) {
        result = orderLineItem;
        return;
      }
    });

    return result;
  },

  // This is needed because when saving the order, the order-line-items
  // are saved with the order (via embedded records mixin)
  // I don't think Ember-Data expects this, and as a result,
  // duplicate line items appear in the association.
  removeItemsWithNullIds() {
    let lineItems = this.get('orderLineItems');
    lineItems.forEach(item => {
      if (!item.get('id')) {
        item.destroyRecord();
      }
    });
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
      orderLineItem.set('paymentToken', this.get('order.paymentToken'));
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

  validations: {
    host: { presence: true },
    attendance: {
      custom: {
        message: 'Attendance must be set when registering for an event',
        validation(key, value, model) {
          let isEvent = model.get('host.isEvent');
          if (isEvent) {
            return Ember.isPresent(value);
          }

          return true;
        }
      }
    }
  }

});
