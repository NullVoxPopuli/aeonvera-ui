import Ember from 'ember';

const {computed, isPresent, inject} = Ember;

export default Ember.Component.extend({
  ajax: inject.service('authenticated-ajax'),

  // passed in
  orderLineItems: [],

  // managed here
  showOnlyNonPickedIn: false,
  queryText: '',
  columns: [
    {property: 'order.userName', title: 'Name'},
    {property: 'lineItem.name', title: 'Item Name'},
    {property: 'quantity', title: 'Quantity'},
    {property: 'size', title: 'Size'},
    {property: 'order.paid', title: 'Paid Status'},
    {property: 'pickedUpAt', title: 'Picked Up At'}
  ],

  filteredOrderLineItems: computed(
    'orderLineItems', 'queryText', 'showOnlyNonPickedUp', {
      get() {
        const items = this.get('orderLineItems');
        const query = this.get('queryText').toLowerCase();
        const queryPresent = isPresent(query);
        const onlyNonPickedUp = this.get('showOnlyNonPickedUp');

        let filtered = items;

        if (onlyNonPickedUp) {
          filtered = filtered.filterBy('pickedUp', false);
        }

        if (queryPresent) {
          filtered = filtered.filter(item => {
            const name = item.get('order.userName');

            return name.toLowerCase().includes(query);
          });
        }

        return filtered;
      }
    }),

  percentPickedUp: computed('orderLineItems.@each.pickedUp', {
    get() {
      const pickedUp = this.get('numberPickedUp');
      const total = this.get('orderLineItems.length');
      const percent = pickedUp / total * 100;

      return Math.round(percent, 2);
    }
  }),

  numberPickedUp: computed('orderLineItems.@each.pickedUp', {
    get() {
      return this.get('orderLineItems').filterBy('pickedUp').get('length');
    }
  }),

  numberNotPickedUp: computed('orderLineItems.@each.pickedUp', {
    get() {
      return this.get('orderLineItems').filterBy('pickedUp', false).get('length');
    }
  }),

  actions: {
    setPickedUp(item) {
      const id = item.get('id');
      const ajax = this.get('ajax');
      const path = `/api/order_line_items/${id}/mark_as_picked_up`;

      ajax.PUT(path).then(data => {
        this.get('store').pushPayload(data);
      }, error => {
        const json = JSON.parse(error.responseText);
        const errors = json.errors;

        this.get('flashMessages').alert(errors);
      });
    }
  }

});
