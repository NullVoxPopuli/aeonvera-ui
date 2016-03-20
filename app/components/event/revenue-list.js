import Ember from 'ember';
import Sortable from 'aeonvera/mixins/components/sortable-helpers';

export default Ember.Component.extend(Sortable, {
  startTime: null,
  endTime: null,

  sortedOrders: Ember.computed.sort('filteredOrders', 'sortProps'),
  sortProps: ['createdAt:desc'],


  totalPaidAmount: function () {
    let orders = this.get('filteredOrders');
    return orders.mapBy('paidAmount').reduce(function (a, b) {
      return a + b;
    }, 0);
  }.property('filteredOrders'),

  totalAmountReceived: function () {
    let orders = this.get('filteredOrders');
    return orders.mapBy('netAmountReceived').reduce(function (a, b) {
      return a + b;
    }, 0);
  }.property('filteredOrders'),

  totalFeeAmount: function () {
    let orders = this.get('filteredOrders');
    return orders.mapBy('totalFeeAmount').reduce(function (a, b) {
      return a + b;
    }, 0);
  }.property('filteredOrders'),

  filteredOrders: function () {
    let model = this.get('model');

    let startTime = this.get('startTime');
    let endTime = this.get('endTime');

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

    return filtered;
  }.property('model', 'startTime', 'endTime'),

  createdSort: function () {
    return this._sortIndicator('createdAt');
  }.property('sortProps'),

  grossSort: function () {
    return this._sortIndicator('paidAmount');
  }.property('sortProps'),

  netSort: function () {
    return this._sortIndicator('netAmountReceived');
  }.property('sortProps'),

  feeSort: function () {
    return this._sortIndicator('totalFeeAmount');
  }.property('sortProps'),
});
