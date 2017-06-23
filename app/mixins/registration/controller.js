import Ember from 'ember';
import RSVP from 'rsvp';

const { isBlank, isPresent, inject } = Ember;

// requires that the including controler have the following:
// - properties:
//   - order
//   - host
export default Ember.Mixin.create({
  store: inject.service('store'),
  flash: inject.service('flash-notification'),

  _existingOrderLineItemForItem(lineItem) {
    const order = this.get('order');

    return RSVP.resolve(order)
      .then(order => order.get('orderLineItems'))
      .then(items => {
        const item = items.find(item => {
          const fromExisting = item.get('lineItem');

          return (
            fromExisting.get('id') === lineItem.get('id') &&
            fromExisting.get('klass') === lineItem.get('klass')
          );
        });

        return RSVP.resolve(item);
      });
  },

  _updateOrCreateOrderLineItemForItem(oldLineItem, newLineItem) {
    return this._ensureOrderIsPersisted()
      .then(order => this._existingOrderLineItemForItem(oldLineItem))
      .then(orderLineItem => {
        if (isPresent(orderLineItem)) {
          orderLineItem.set('lineItem', newLineItem);
          return orderLineItem.save();
        }

        return this._createOrderLineItemForItem(newLineItem);
      });
  },

  _createOrderLineItemForItem(lineItem) {
    const store = this.get('store');
    const order = this.get('order');

    return store.createRecord('orderLineItem', {
      order,
      lineItem,
      host_id: this.get('host.id'),
      host_type: this.get('host.klass') })
    .save();
  },

  _cleanErroneousLineItems() {
    const order = this.get('order');
    const items = order.get('orderLineItems');

    const unsaved = items.filter(i => i.get('isNew'));

    unsaved.forEach(item => item.unloadRecord());
  },

  _ensureOrderIsPersisted() {
    const order = this.get('order');

    return RSVP.resolve(order)
      .then(existingOrder => {
        if (isPresent(existingOrder)) return RSVP.resolve(existingOrder);

        const store = this.get('store');

        const orderParams = {
          host: this.get('host'),
          user: this.get('currentUser'),
          userName: this.get('userName'),
          userEmail: this.get('userEmail'),
          attendance: this.get('registration')
        };

        return store.createRecord('order', orderParams)
          .save()
          .then(newOrder => {
            // TODO: make this consistent / require 'order'
            this.set('model.order', newOrder);
            this.set('order', newOrder);
            return RSVP.resolve(order);
          });
      });
  },

  _refreshOrder() {
    const order = this.get('order');

    let newOrder = this.store.findRecord('order', order.get('id'), {
      include: 'order_line_items.line_item'
    });

    this.set('model.order', newOrder);

    return newOrder;
  },

  _subtractOneQuantityForOrderLineItem(orderLineItem) {
    const nextQuantity = orderLineItem.get('quantity') - 1;

    if (nextQuantity > 0) {
      orderLineItem.set('quantity', nextQuantity);

      return orderLineItem.save().then(order => this._refreshOrder());
    }

    return orderLineItem.destroyRecord().then(() => this._refreshOrder());
  },

  _addOneQuantityForOrderLineItem(orderLineItem) {
    orderLineItem.set('quantity', orderLineItem.get('quantity') + 1);
    return orderLineItem.save();
  },

  actions: {
    didCancelOrder() {
      const order = this.get('order');

      return order.destroyRecord()
        .catch(e => this.get('flash').alert(e));
    },

    didRemoveOrderLineItem(orderLineItem) {
      return orderLineItem.destroyRecord()
        .catch(e => this.get('flash').alert(e));
    },


    didAddLineItem(lineItem) {
      const store = this.get('store');

      return this._ensureOrderIsPersisted()
        .then(order => this._existingOrderLineItemForItem(lineItem)
        .then(orderLineItem => {
          if (isPresent(orderLineItem)) return this._addOneQuantityForOrderLineItem(orderLineItem);

          return this._createOrderLineItemForItem(lineItem);
        })
        .then(order => this._refreshOrder())).catch(e => {
          this.get('flash').alert(e);
          this._cleanErroneousLineItems();
        });
    },

    didSubtractLineItem(lineItem) {
      return this._ensureOrderIsPersisted().then(order => {
        // do nothing if there are no order line items
        if (order.get('orderLineItems.length') === 0) return RSVP.resolve();

        // do nothing if quantity for an order line item is 0?
        return order.get('orderLineItems')
          .then(orderLineItems => {
            const oli = orderLineItems
              .filter(oli => oli.get('lineItem.id') === lineItem.id).get('firstObject');

            return this._subtractOneQuantityForOrderLineItem(oli);
          });
      }).catch(e => {
        this.get('flash').alert(e);
        this._cleanErroneousLineItems();
      });
    }
  }
});
