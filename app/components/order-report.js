import Ember from 'ember';

export default Ember.Component.extend({
  afterDate: null,
  beforeDate: null,
  pastDays: 35,
  firstOrLastNameContains: null,

  // 0 - all, 1 - paid, 2 - unpaid
  showPaid: 0,

  sortedOrders: Ember.computed.sort('orders', 'sortProps'),
  sortProps: ['paymentReceivedAt:desc'],

  orders: function () {
    let host = this.get('model');
    let pastDays = this.get('pastDays');
    let nameContains = this.get('firstOrLastNameContains');
    let showPaid = this.get('showPaid');

    let query = {
      host_id_eq: host.hostId,
      host_type_eq: host.hostType,
    };

    if (Ember.isPresent(pastDays)) {
      let m = moment(new Date());
      m.subtract(pastDays, 'days');
      query.created_at_gteq = m.format();
    }

    if (Ember.isPresent(nameContains)) {
      query.user_first_name_or_user_last_name_cont = nameContains;

      // query['attendance_attendee_name_cont'] = nameContains;
    }

    if (showPaid !== 0) {
      if (showPaid === 1) {
        query.paid_true = 1;
      } else {
        query.paid_false = 1;
      }

    }

    let promise = this.store.query('order', {
      q: query,
      include: 'order_line_items.line_item',
    });

    return promise;
  }.property('model', 'pastDays', 'showPaid'),

  nameSort: function () {
    return this._sortIndicator('userName');
  }.property('sortProps'),

  paidSort: function () {
    return this._sortIndicator('paid');
  }.property('sortProps'),

  paidAmountSort: function () {
    return this._sortIndicator('paidAmount');
  }.property('sortProps'),

  netSort: function () {
    return this._sortIndicator('netAmountReceived');
  }.property('sortProps'),

  feeSort: function () {
    return this._sortIndicator('totalFeeAmount');
  }.property('sortProps'),

  receivedAtSort: function () {
    return this._sortIndicator('paymentReceivedAt');
  }.property('sortProps'),

  _sortIndicator: function (field) {
    let currentSort = this.get('sortProps')[0];
    let sort = currentSort.split(':');
    let sortProperty = sort[0];
    let sortDirection = sort[1];

    if (sortProperty === field) {
      return (sortDirection === 'desc') ? '▼' : '▲';
    }

    return '';
  },

  actions: {
    toggleSort: function (property) {
      let currentSort = this.get('sortProps')[0];
      let sort = currentSort.split(':');
      let sortProperty = sort[0];
      let sortDirection = sort[1];

      if (property === sortProperty) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        this.set('sortProps', [property + ':' + sortDirection]);
      } else {
        this.set('sortProps', [property + ':asc']);
      }
    },
  },

});
