import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  startTime: null,
  endTime: null,
  paidStartTime: null,
  paidEndTime: null,
  showCash: true,
  showChecks: true,
  showStripe: true,

  PAYPAL: 'PayPal',
  CHECK: 'Check',
  CASH: 'Cash',
  STRIPE: 'Stripe',
  DEBIT: 'Debit',

  columns: [
    { property: 'createdAt', title: 'Time' },
    { property: 'paymentReceivedAt', title: 'Paid At' },
    { property: 'paymentMethod', title: 'Paid With' },
    { property: 'currentPaidAmount', title: 'Gross Paid' },
    { property: 'currentNetAmountReceived', title: 'Net Amount Received' },
    { property: 'currentTotalFeeAmount', title: 'Fees' }
  ],

  totalPaidAmount: computed('filteredOrders', {
    get() {
      let orders = this.get('filteredOrders');
      return orders.mapBy('currentPaidAmount').reduce(function (a, b) {
        return a + b;
      }, 0);
    }
  }),

  totalAmountReceived: computed('filteredOrders', {
    get() {
      let orders = this.get('filteredOrders');
      return orders.mapBy('currentNetAmountReceived').reduce(function (a, b) {
        return a + b;
      }, 0);
    }
  }),

  totalFeeAmount: computed('filteredOrders', {
    get() {
      let orders = this.get('filteredOrders');
      return orders.mapBy('currentTotalFeeAmount').reduce(function (a, b) {
        return a + b;
      }, 0);
    }
  }),

  filteredOrders: computed('model',
    'startTime', 'endTime',
    'paidStartTime', 'paidEndTime',
    'showCash', 'showChecks', 'showStripe', {
    get() {
      let model = this.get('model');

      let startTime = this.get('startTime');
      let endTime = this.get('endTime');

      let paidStartTime = this.get('paidStartTime');
      let paidEndTime = this.get('paidEndTime');

      let cash = this.get('CASH');
      let check = this.get('CHECK');
      let stripe = this.get('STRIPE');
      let showCash = this.get('showCash');
      let showChecks = this.get('showChecks');
      let showStripe = this.get('showStripe');
      let filtered = model;

      if (startTime != null) {
        filtered = filtered.filter(function (item) {
          let time = item.get('createdAt');
          let isAfterStartTime = moment(time).isAfter(startTime);
          return isAfterStartTime;
        });
      }

      if (endTime != null) {
        filtered = filtered.filter(function (item) {
          let time = item.get('createdAt');
          let isBeforeEndTime = moment(time).isBefore(endTime);
          return isBeforeEndTime;
        });
      }

      if (paidStartTime != null) {
        filtered = filtered.filter(function (item) {
          let time = item.get('createdAt');
          let isAfterStartTime = moment(time).isAfter(paidStartTime);
          return isAfterStartTime;
        });
      }

      if (paidEndTime != null) {
        filtered = filtered.filter(function (item) {
          let time = item.get('createdAt');
          let isBeforeEndTime = moment(time).isBefore(paidEndTime);
          return isBeforeEndTime;
        });
      }

      filtered = filtered.filter(item => {
        let paymentMethod = item.get('paymentMethod');

        return (
          showCash && paymentMethod === cash ||
          showChecks && paymentMethod === check ||
          showStripe && paymentMethod === stripe
        );
      });

      return filtered;
    }
  })
});
