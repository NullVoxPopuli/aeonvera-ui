import Ember from 'ember';
export default Ember.Component.extend({
  itemsInOrder: [],

  currentOrder: null,

  sidebarContainerClasses: 'large-3 medium-4 columns',
  itemContainerClasses: 'large-9 medium-8 columns',

  defaultSidebarContainerClasses: 'large-3 medium-4 columns',
  defaultItemContainerClasses: 'large-9 medium-8 columns',

  buildingSidebarContainerClasses: 'large-3 medium-4 columns',
  buildingItemContainerClasses: 'large-6 medium-8 columns',
  orderContainerClasses: 'large-3 medium-3 columns',

  buildingAnOrder: function () {
    let currentOrder = this.get('currentOrder');
    if (Ember.isPresent(currentOrder)) {
      return true;
    }

    return false;
  }.property('currentOrder'),

  currentItems: Ember.computed('currentOrder.lineItems.[]', function () {
    return this.get('currentOrder.lineItems');
  }),

  actions: {
      beginBuildingAnOrder: function () {
        this.set('sidebarContainerClasses', this.get('buildingSidebarContainerClasses'));
        this.set('itemContainerClasses', this.get('buildingItemContainerClasses'));
      },

      addToOrder: function (item) {
        if (!this.get('buildingAnOrder')) {

          this.send('beginBuildingAnOrder');

          let currentEvent = this.get('event');
          let order = this.store.createRecord('order', {
            host: currentEvent,
          });

          this.set('currentOrder', order);
        }

        this.get('currentOrder').addLineItem(item);
      },

      removeItem: function (item) {
        let order = this.get('currentOrder');
        order.removeOrderLineItem(item);

        if (!order.get('hasLineItems')) {
          this.send('cancelOrder');
        }
      },

      cancelOrder: function () {
        this.set('sidebarContainerClasses', this.get('defaultSidebarContainerClasses'));
        this.set('itemContainerClasses', this.get('defaultItemContainerClasses'));

        this.get('currentOrder.lineItems').toArray().forEach(function (item) {
          item.destroyRecord();
          item.save();
        });

        this.get('currentOrder').destroyRecord();
        this.get('currentOrder').save();
        this.set('currentOrder', null);
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

      processStripeToken: function (args) {
        let order = this.get('currentOrder');
        /*
          send the token to the server to actually create the charge
         */
        order.setProperties({
          paymentMethod: 'Stripe',
          checkoutToken: args.id,
          checkoutEmail: args.email,
        });

        /* save the line order first */
        if (order.get('isNew')) {
          order.save().then((o) => {
            o.get('lineItems').invoke('save');
            o.save().then(() => {
              this.send('finishedOrder');
            }, function (errors) {
              alert(errors);
            });
          });
        } else {
          order.setProperties({
            checkoutToken: args.id,
            checkoutEmail: args.email,
          });

          order.save().then(() => {
            /* what happens if the card is declined? */
            this.send('finishedOrder');
          }, function (order) {
            alert(order);
          });
        }
      },

      process: function (args) {
        let paymentMethod = args.paymentMethod;
        let checkNumber = args.checkNumber;
        let stripeData = args.stripeData;
        let order = this.get('currentOrder');

        order.markPaid(paymentMethod, checkNumber, stripeData);
        /* save the line order first */
        order.save().then((o) => {
          /* then line items */
          o.get('lineItems').invoke('save');
          o.save().then(function () {

          }, function (error) {

            alert(error);
          });

          this.send('finishedOrder');
        }, function (error) {

          alert(error);
        });

      },
    },
});
