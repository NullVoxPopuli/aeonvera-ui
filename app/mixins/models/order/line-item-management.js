import Ember from 'ember';

const { computed, inject, isBlank } = Ember;

export default Ember.Mixin.create({

  /*
    takes the line item, and makes an order line item out of it
    lineItem - the item to add or update
    quantity - the quantity to *set* to. This does not add.
    price - overrides the price of the lineItem
  */
  addLineItem: function(lineItem, quantity = 1, price = null) {
    price    = price ? price : lineItem.get('currentPrice');
    quantity = parseInt(quantity) || 0;

    if (lineItem.get('isPackage')) {
      // remove any old package
      // - 1 package per order
      this._setPackage(lineItem, price);
    } else {

      // is the item already in the order?
      let orderLineItem = this.getOrderLineItemMatching(lineItem, price);
      let oliExists     = Ember.isPresent(orderLineItem);
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

    // if we are an event, check for sponsorship discount
    this._addSponsorshipDiscount();
  },

  _addSponsorshipDiscount() {
    let host = this.get('host');
    let automaticDiscounts = this.get('automaticDiscounts');
    if (false === automaticDiscounts) return false;

    if (isBlank(host)) { return; }

    let sponsorships = host.get('sponsorships');

    if (isBlank(sponsorships)) { return; }

    // have to pull the record out of the store so we get our methods defined on
    // the model, rather than just being able to interact with the raw data
    let user = this.get('store').peekRecord('user', 'current-user');
    if (isBlank(user)) { return; }

    sponsorships.forEach(sponsorship => {
      let organization = sponsorship.get('sponsor');
      let discountId = sponsorship.get('discount.id');

      // have to pull the record out of the store so we get our methods defined on
      // the model, rather than just being able to interact with the raw data
      let discount = this.get('store').peekRecord('discount', discountId);

      // is the user a member of this organization?
      // if so, apply the discount
      let isMember = user.isMemberOf(organization);
      if (isMember) {
        // add the discount
        this.addLineItem(discount);
      }
    });
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

  hasDiscount() {
    let items           = this.get('orderLineItems');
    let activeDiscounts = items.filterBy('lineItem.isADiscount');
    return Ember.isPresent(activeDiscounts);
  },

  /*
    Currently, only membership discounts are applied
    - these are applied to lessons right now, but
  */
  _updateAutomaticDiscounts() {
    if (!this._eligibleForDiscount()) return;

    let discounts          = this.get('host.membershipDiscounts');
    let items              = this.get('orderLineItems');
    let activeDiscounts    = items.filterBy('lineItem.isADiscount');
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

  automaticDiscounts: true,
  _eligibleForDiscount() {
    let host = this.get('host');
    let discounts = host.get('membershipDiscounts');
    let automaticDiscounts = this.get('automaticDiscounts');
    if (false === automaticDiscounts) return false;

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
      price:    price,
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

      // due to how ember's polymorphism works, currentLineItem
      // is always going to be of type 'LineItem'

      let isDiscount = currentLineItem.get('isADiscount');

      let isSameKind = this.lineItemIsTheSameTypeAs(lineItem, currentLineItem);

      if (
          isSameKind &&
          currentLineItem.get('id') === lineItem.get('id')// &&
          // (currentPrice === price || isDiscount)
        ) {
        result = orderLineItem;
        return;
      }
    });

    return result;
  },

  lineItemIsTheSameTypeAs(source, other) {
    if (isBlank(source) || isBlank(other)) {
      return false;
    }

    let modelNameSource = this.modelNameFor(source);
    let modelNameOther = this.modelNameFor(other);

    if (isBlank(modelNameSource) && isBlank(modelNameOther)) {
      return false;
    }

    return (modelNameSource === modelNameOther);
  },

  modelNameFor(obj) {
    if (obj.constructor.modelName) {
      return obj.constructor.modelName;
    }

    if (obj.content) {
      return obj.content.constructor.modelName;
    }

    return null;
  },

  // This is needed because when saving the order, the order-line-items
  // are saved with the order (via embedded records mixin)
  // I don't think Ember-Data expects this, and as a result,
  // duplicate line items appear in the association.
  removeItemsWithNullIds() {
    let items = this.get('store').peekAll('orderLineItem');
    items.forEach(item => {
      if (item.get('id') === null && !item.get('isSaving')) {
        item.unloadRecord();
      }
    });
  },

  hasLineItem: function(lineItem) {
    let lineItems      = this.get('orderLineItems');
    let items          = lineItems.mapBy('lineItem');
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
});
