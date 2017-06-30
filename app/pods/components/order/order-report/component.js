import Ember from 'ember';
import computed, { alias, sort } from 'ember-computed-decorators';
import { PropTypes } from 'ember-prop-types';

const { isPresent, observer } = Ember;

export default Ember.Component.extend({
  propTypes: {
    orders: PropTypes.any,
    searchOrders: PropTypes.any.isRequired,
    hostId: PropTypes.any.isRequired,
    hostType: PropTypes.string.isRequired
  },

  afterDate: null,
  beforeDate: null,
  pastDays: 35,
  firstOrLastNameContains: null,
  selectedLineItem: null,

  // 0 - all, 1 - paid, 2 - unpaid
  showPaid: 0,

  @sort('orders', 'sortProps') sortedOrders: null,
  sortProps: ['paymentReceivedAt:desc'],

  didInsertElement() {
    this._super(...arguments);

    // trigger the observing search
    this.get('searchOrders').perform(this.get('orderQuery'), true);
  },

  search: observer('orderQuery', function() {
    const query = this.get('orderQuery');

    this.get('searchOrders').perform(this.get('orderQuery'));
  }),

  @computed('hostId', 'hostType', 'pastDays', 'showPaid', 'selectedLineItem')
  orderQuery(hostId, hostType, pastDays, showPaid, selectedLineItem) {
    const nameContains = this.get('firstOrLastNameContains');

    const query = {
      host_id_eq: hostId,
      host_type_eq: hostType
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

    return query;
  },

  @computed('sortProps')
  nameSort() {
    return this._sortIndicator('userName');
  },


  @computed('sortProps')
  paidSort() {
    return this._sortIndicator('paid');
  },

  @computed('sortProps')
  paidAmountSort() {
    return this._sortIndicator('paidAmount');
  },

  @computed('sortProps')
  netSort() {
    return this._sortIndicator('netAmountReceived');
  },

  @computed('sortProps')
  feeSort() {
    return this._sortIndicator('totalFeeAmount');
  },

  @computed('sortProps')
  receivedAtSort() {
    return this._sortIndicator('paymentReceivedAt');
  },

  @computed('sortProps')
  createdAtSort() {
    return this._sortIndicator('createdAt');
  },

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
    toggleSort(property) {
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
