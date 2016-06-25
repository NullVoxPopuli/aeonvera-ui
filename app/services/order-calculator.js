import Ember from 'ember';

const { computed, inject, isPresent, isBlank } = Ember;

export default Ember.Service.extend({
  store: inject.service(),

  // the order passed in to calculate the total on.
  // the following relationships should be resolved:
  //  - host
  //  - orderLineItems
  //    - lineItem
  //      - restraints
  //
  // host needs to be resolved so we can see if we only accept electronic
  // payments, and for how we handle fees
  //
  // lineItem needs to be resolved for each orderLineItem because
  // how else do we know what the orderLineItem references? ^_~
  //
  // restraints need to be resolved for each lineItem, because they
  // will tell us what to apply the discount to (such as a package)
  calculateSubTotal(order) {
    let orderLineItems = order.get('orderLineItems');
    let subTotal = 0;

    orderLineItems.forEach(item => {
      if (item.get('lineItem.isDiscount')) {
        subTotal += this.amountOfDiscount(order, item);
      } else {
        subTotal += item.get('total');
      }
    });

    return subTotal;
  },

  amountOfDiscount(order, orderLineItem) {
    let lineItem = orderLineItem.get('lineItem');

    if (lineItem.get('kind') === lineItem.get('DOLLARS_OFF')) {
      return orderLineItem.get('total');
    }

    return this.amountRepresentedByPercentOff(order, orderLineItem);
  },

  amountRepresentedByPercentOff(order, orderLineItem) {
    let lineItem = orderLineItem.get('lineItem');
    let restraints = lineItem.get('restraints');

    // do we have the thing that this discount applies to?
    // (package, competition, etc)
    if (isBlank(restraints)) {
      // the discount will be applied after the pre-subTotal is calculated.
      return 0;
    }

    let restrainedToOrderLineItem = this.itemCorrespondingToDiscount(order, restraints, lineItem);

    if (isBlank(restrainedToOrderLineItem)) {
      // the discount does not apply to anything, it will be removed
      // by the server.
      return 0;
    }

    // convert to decimal
    // it's safe to call amount, because this is discount only territory
    let discountPercent = lineItem.get('amount') / 100.0;

    // convert discount to dollar amount
    let price = restrainedToOrderLineItem.get('total') * discountPercent;

    if (isNaN(price)) {
      price = 0;

      // Rollbar.error('price is NaN for orderLineItem: ' + orderLineItem.get('id'));
      console.error('price is NaN');
    }

    // subtract the amount of that thing
    return 0 - price;
  },

  restraintIsMet(order, restraints, lineItem) {
    let result = false;

    // NOTE:
    //  - discounts are dependable / restrictionFor
    //  - other things are restrictable / restrictedTo
    restraints.forEach(restraint => {
      // for the restraints from the lineItem,
      // does the order.orderLineItems contain a match, such that
      // both sides of the restraint relationship are met
      // in an orderLineItem
      let restrictedTo = restraint.get('restrictedTo');
      if (order.hasLineItem(restrictedTo)) {
        result = true;
        return;
      }
    });

    return result;
  },

  itemCorrespondingToDiscount(order, restraints) {
    let result = null;

    restraints.forEach(restraint => {
      // the discount is the restrictionFor
      // the package is the restrictedTo
      let restrictedTo = restraint.get('restrictedTo');

      let price = restrictedTo.get('currentPrice');

      let orderLineItem = order.getOrderLineItemMatching(restrictedTo, price);
      if (isPresent(orderLineItem)) {
        result = orderLineItem;
        return;
      }
    });

    return result;
  }

});
