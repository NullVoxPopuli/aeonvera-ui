import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
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
      const orders = this.get('filteredOrders');

      return orders.mapBy('currentPaidAmount').reduce(function(a, b) {
        return a + b;
      }, 0);
    }
  }),

  totalAmountReceived: computed('filteredOrders', {
    get() {
      const orders = this.get('filteredOrders');

      return orders.mapBy('currentNetAmountReceived').reduce(function(a, b) {
        return a + b;
      }, 0);
    }
  }),

  totalFeeAmount: computed('filteredOrders', {
    get() {
      const orders = this.get('filteredOrders');

      return orders.mapBy('currentTotalFeeAmount').reduce(function(a, b) {
        return a + b;
      }, 0);
    }
  }),

  filteredOrders: computed('model',
    'startTime', 'endTime',
    'paidStartTime', 'paidEndTime',
    'showCash', 'showChecks', 'showStripe', {
      get() {
        const model = this.get('model');

        const startTime = this.get('startTime');
        const endTime = this.get('endTime');

        const paidStartTime = this.get('paidStartTime');
        const paidEndTime = this.get('paidEndTime');

        const cash = this.get('CASH');
        const check = this.get('CHECK');
        const stripe = this.get('STRIPE');
        const showCash = this.get('showCash');
        const showChecks = this.get('showChecks');
        const showStripe = this.get('showStripe');
        let filtered = model;

        if (startTime != null) {
          filtered = filtered.filter(function(item) {
            const time = item.get('createdAt');
            const isAfterStartTime = moment(time).isAfter(startTime);

            return isAfterStartTime;
          });
        }

        if (endTime != null) {
          filtered = filtered.filter(function(item) {
            const time = item.get('createdAt');
            const isBeforeEndTime = moment(time).isBefore(endTime);

            return isBeforeEndTime;
          });
        }

        if (paidStartTime != null) {
          filtered = filtered.filter(function(item) {
            const time = item.get('createdAt');
            const isAfterStartTime = moment(time).isAfter(paidStartTime);

            return isAfterStartTime;
          });
        }

        if (paidEndTime != null) {
          filtered = filtered.filter(function(item) {
            const time = item.get('createdAt');
            const isBeforeEndTime = moment(time).isBefore(paidEndTime);

            return isBeforeEndTime;
          });
        }

        filtered = filtered.filter(item => {
          const paymentMethod = item.get('paymentMethod');

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
