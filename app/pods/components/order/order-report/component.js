import Ember from 'ember';

const {computed, isPresent} = Ember;

export default Ember.Component.extend({
  afterDate: null,
  beforeDate: null,
  pastDays: 35,
  firstOrLastNameContains: null,
  selectedLineItem: null,

  // 0 - all, 1 - paid, 2 - unpaid
  showPaid: 0,

  sortedOrders: Ember.computed.sort('orders', 'sortProps'),
  sortProps: ['paymentReceivedAt:desc'],

  hostId: computed.alias('model.hostId'),
  hostType: computed.alias('model.hostType'),

  orders: computed('model', 'pastDays', 'showPaid', 'selectedLineItem', function() {
    const host = this.get('model');
    const pastDays = this.get('pastDays');
    const nameContains = this.get('firstOrLastNameContains');
    const showPaid = this.get('showPaid');
    const selectedLineItem = this.get('selectedLineItem');

    const query = {
      host_id_eq: host.hostId,
      host_type_eq: host.hostType
    };

    if (isPresent(pastDays)) {
      const m = moment(new Date());

      m.subtract(pastDays, 'days');
      query.created_at_gteq = m.format();
    }

    if (isPresent(nameContains)) {
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

    if (isPresent(selectedLineItem)) {
      query.order_line_items_line_item_id_eq = selectedLineItem.get('id');
      query.order_line_items_line_item_type_like = selectedLineItem.get('klass');
    }

    const promise = this.store.query('order', {
      q: query,
      include: 'order_line_items.line_item'
    });

    return promise;
  }),

  nameSort: function() {
    return this._sortIndicator('userName');
  }.property('sortProps'),

  paidSort: function() {
    return this._sortIndicator('paid');
  }.property('sortProps'),

  paidAmountSort: function() {
    return this._sortIndicator('paidAmount');
  }.property('sortProps'),

  netSort: function() {
    return this._sortIndicator('netAmountReceived');
  }.property('sortProps'),

  feeSort: function() {
    return this._sortIndicator('totalFeeAmount');
  }.property('sortProps'),

  receivedAtSort: function() {
    return this._sortIndicator('paymentReceivedAt');
  }.property('sortProps'),

  _sortIndicator: function(field) {
    const currentSort = this.get('sortProps')[0];
    const sort = currentSort.split(':');
    const sortProperty = sort[0];
    const sortDirection = sort[1];

    if (sortProperty === field) {
      return (sortDirection === 'desc') ? '▼' : '▲';
    }

    return '';
  },

  actions: {
    toggleSort: function(property) {
      const currentSort = this.get('sortProps')[0];
      const sort = currentSort.split(':');
      const sortProperty = sort[0];
      let sortDirection = sort[1];

      if (property === sortProperty) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        this.set('sortProps', [property + ':' + sortDirection]);
      } else {
        this.set('sortProps', [property + ':asc']);
      }
    }
  }

});
