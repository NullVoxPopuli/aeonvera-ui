import Ember from 'ember';
import DS from 'ember-data';
import Validator from '../mixins/model-validator';
import LineItemManagement from 'aeonvera/mixins/models/order/line-item-management';
import PriceCalculation from 'aeonvera/mixins/models/order/price-calculation';

const { isPresent, isBlank, computed, inject } = Ember;
const { attr, belongsTo, hasMany, Model } = DS;

export default Model.extend(Validator, LineItemManagement, PriceCalculation, {
  hostName:          attr('string'),
  hostUrl:           attr('string'),
  createdAt:         attr('date'),
  paymentReceivedAt: attr('date'),
  paidAmount:        attr('number'),
  netAmountReceived: attr('number'),
  totalFeeAmount:    attr('number'),
  paymentMethod:     attr('string'),
  paymentToken:      attr('string'),
  checkNumber:       attr('string'),
  paid:              attr('boolean'),

  totalInCents: attr('number'),

  // TODO: think about renaming these to what
  //       they are on the server: buyer_
  userEmail: attr('string'),
  userName:  attr('string'),

  // buyerEmail: attr('string'),
  // buyerName: attr('string'),

  host:           belongsTo('host', { polymorphic: true }),
  orderLineItems: hasMany('orderLineItem'),
  attendance:     belongsTo('attendance', { async: false }),
  user:           belongsTo('user'),
  pricingTier:    belongsTo('pricingTier'),

  /*
    stripe specific things
    TODO: think about extracting this in to an object,
    and saving all of the toke info (like IP, maybe other stuff)
  */
  checkoutToken: attr('string'),
  checkoutEmail: attr('string'),

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

  paidClass: function() {
    let paid = this.get('paid');
    return paid ? 'success-color' : 'alert-color';
  }.property('paid'),

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
        checkNumber:   checkNumber,
        paid:          true,
        paidAmount:    this.get('subTotal'),
        stripeData:    stripeData,
      });
    }
  },

  validations: {
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
