import Ember from 'ember';

export default Ember.Component.extend({
  currentOrder: null,
  orderContainerClasses: 'large-3 medium-4 columns',

  itemContainerClasses: Ember.computed('buildingAnOrder', function(){
    let building = this.get('buildingAnOrder');
    return building ? 'large-8 medium-8 columns' : 'small-12 columns'
  }),

  buildingAnOrder: Ember.computed('currentOrder', function() {
    let currentOrder = this.get('currentOrder');
    return Ember.isPresent(currentOrder);
  }),

  currentItems: Ember.computed('currentOrder.lineItems.[]', function () {
    return this.get('currentOrder.lineItems');
  }),

  actions: {

    removeItem: function (item) {
      let order = this.get('currentOrder');
      order.removeOrderLineItem(item);

      if (!order.get('hasLineItems')) {
        this.send('cancelOrder');
      }
    },

    addToOrder: function (item) {
      if (!this.get('buildingAnOrder')) {
        this.send('beginBuildingAnOrder');

        let host = this.get('host');
        let order = this.store.createRecord('order', {
          host: host,
        });

        this.set('currentOrder', order);
      }
      this.get('currentOrder').addLineItem(item);
    },

    cancel: function(){
      this.set('sidebarContainerClasses', this.get('defaultSidebarContainerClasses'));
      this.set('itemContainerClasses', this.get('defaultItemContainerClasses'));
    },

    finishedOrder: function () {
      Ember.$('.close-reveal-modal').click();

      this.set('sidebarContainerClasses', this.get('defaultSidebarContainerClasses'));
      this.set('itemContainerClasses', this.get('defaultItemContainerClasses'));
      this.set('currentOrder', null);
      this.get('flashMessages').success(
        'Order was successfully created and recorded'
      );
    },

    processStripeToken: function(args){

    },

    process: function(args){

    }
  }

});
