import Ember from 'ember';
import DS from 'ember-data';
import { computed } from 'ember-decorators/object';
import { alias, gt, mapBy, not } from 'ember-decorators/object/computed';

import PriceCalculation from 'aeonvera/mixins/models/order/price-calculation';

const { isPresent, isBlank, inject } = Ember;
const { attr, belongsTo, hasMany, Model } = DS;

const CENTS_IN_A_DOLLAR = 100;

export default Model.extend(PriceCalculation, {
  PAYPAL: 'PayPal',
  CHECK: 'Check',
  CASH: 'Cash',
  STRIPE: 'Stripe',
  DEBIT: 'Debit',

  hostName: attr('string'),
  hostUrl: attr('string'),
  notes: attr('string'),
  createdAt: attr('date'),
  paymentReceivedAt: attr('date'),
  paidAmount: attr('number'),
  netAmountReceived: attr('number'),
  totalFeeAmount: attr('number'),
  paymentMethod: attr('string'),
  paymentToken: attr('string'),
  checkNumber: attr('string'),
  paid: attr('boolean'),
  isFeeAbsorbed: attr('boolean'),

  currentPaidAmount: attr('number'),
  currentNetAmountReceived: attr('number'),
  currentTotalFeeAmount: attr('number'),

  totalInCents: attr('number'),
  total: attr('number'),
  subTotal: attr('number'),

  // TODO: think about renaming these to what
  //       they are on the server: buyer_
  userEmail: attr('string'),
  userName: attr('string'),

  // buyerEmail: attr('string'),
  // buyerName: attr('string'),

  host: belongsTo('host', { polymorphic: true }),
  orderLineItems: hasMany('orderLineItem', { async: true }),
  registration: belongsTo('registration', { async: true }),
  user: belongsTo('user'),
  pricingTier: belongsTo('pricingTier'),
  stripeRefunds: attr(),

  /*
    stripe specific things
    TODO: think about extracting this in to an object,
    and saving all of the toke info (like IP, maybe other stuff)
  */
  checkoutToken: attr('string'),
  checkoutEmail: attr('string'),

  @computed('stripeRefunds')
  hasRefunds(stripeRefunds) {
    return Ember.isPresent(stripeRefunds);
  },

  @not('paid') unpaid: null,
  @computed('paid')
  paidText(paid) {
    return paid ? 'Yes' : 'No';
  },

  @alias('host') event: null,

  @computed('totalInCents')
  totalInDollars(totalInCents) {
    return totalInCents / CENTS_IN_A_DOLLAR;
  },

  hasLineItems: Ember.computed('orderLineItems.@each', function() {
    return this.get('orderLineItems.length') > 0;
  }),

  @computed('paid')
  paidClass(paid) {
    return paid ? 'success-color' : 'alert-color';
  },


  @mapBy('orderLineItems', 'isNew') newOrderLineItems: null,
  @gt('newOrderLineItems.length', 0) hasUnSavedItems: null,

  // In order for discounts to happen, ever orderLineItem
  // must be persisted. Discounts are computed by the backend.
  @computed('subTotal', 'orderLineItems.@each.{quantity,price}', 'hasUnSavedItems')
  unconfirmedSubTotal(subTotal, orderLineItems, hasUnSavedItems) {
    if (hasUnSavedItems) {
      return orderLineItems.reduce((sum, oli) => {
        return sum + (
          (oli.get('price') || 0) *
          (oli.get('quantity')) || 0
        );
      }, 0);
    }

    return subTotal;
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
