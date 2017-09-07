import Ember from 'ember';
import RSVP from 'rsvp';

const { isBlank, isPresent, inject } = Ember;

// requires that the including controler have the following:
// - properties:
//   - order
//   - host
export default Ember.Mixin.create({
  rollbar: inject.service('rollbar'),
  store: inject.service('store'),
  flash: inject.service('flash-notification'),
  session: inject.service('session'),

  _existingOrderLineItemForItem(lineItem) {
    Ember.Logger.info('_existingOrderLineItemForItem');

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
    Ember.Logger.info('_updateOrCreateOrderLineItemForItem');

    return this._promiseWrappedOrder()
      .then(order => this._existingOrderLineItemForItem(oldLineItem))
      .then(orderLineItem => {
        if (isPresent(orderLineItem)) {
          orderLineItem.set('lineItem', newLineItem);
          if (this.get('token')) orderLineItem.set('paymentToken', this.get('token'));
          return orderLineItem.save();
        }

        return this._createOrderLineItemForItem(newLineItem);
      });
  },

  newOrderLineItemFrom(lineItem) {
    const store = this.get('store');
    const order = this.get('order');

    const orderLineItem = store.createRecord('orderLineItem', {
      price: lineItem.get('currentPrice') || lineItem.get('price'),
      quantity: 1,
      order,
      lineItem,
      host_id: this.get('host.id'),
      host_type: this.get('host.klass') });

    if (this.get('token')) orderLineItem.set('paymentToken', this.get('token'));

    return orderLineItem;
  },

  _createOrderLineItemForItem(lineItem) {
    Ember.Logger.info('_createOrderLineItemForItem');

    const order = this.get('order');
    const orderLineItem = this.newOrderLineItemFrom(lineItem);

    return orderLineItem.save()
      .then(oli => order.get('orderLineItems').pushObject(oli));
  },

  _cleanErroneousLineItems() {
    const order = this.get('order');
    const items = order.get('orderLineItems');

    const unsaved = items.filter(i => i.get('isNew'));

    unsaved.forEach(item => item.unloadRecord());
  },

  _promiseWrappedOrder() {
    const order = this.get('order');

    return RSVP.resolve(order);
  },

  _refreshOrder() {
    Ember.Logger.info('_refreshOrder');

    // don't need to refresh if not authenticated.
    // nothing automatic would happen anyway
    if (!this.get('session.isAuthenticated')) return;

    const order = this.get('order');

    let newOrder = this.store.queryRecord('order', {
      id: order.get('id'),
      include: 'order_line_items.line_item',
      payment_token: this.get('token')
    });

    this.set('model.order', newOrder);

    return newOrder;
  },

  _subtractOneQuantityForOrderLineItem(orderLineItem) {
    Ember.Logger.info('_subtractOneQuantityForOrderLineItem');

    const nextQuantity = orderLineItem.get('quantity') - 1;

    if (this.get('token')) orderLineItem.set('paymentToken', this.get('token'));

    if (nextQuantity > 0) {
      orderLineItem.set('quantity', nextQuantity);

      return orderLineItem.save();// .then(order => this._refreshOrder());
    }

    return this._destroyAndRemove(orderLineItem);
  },

  _addOneQuantityForOrderLineItem(orderLineItem) {
    Ember.Logger.info('_addOneQuantityForOrderLineItem');

    orderLineItem.set('quantity', orderLineItem.get('quantity') + 1);

    return orderLineItem.save();
  },

  _destroyAndRemove(orderLineItem) {
    const order = this.get('order');

    return orderLineItem.destroyRecord()
      .then(() => order.get('orderLineItems').removeObject(orderLineItem));
  },

  actions: {
    didCancelOrder() {
      const token = this.get('token');

      return this._promiseWrappedOrder()
        .then(order => order
          .destroyRecord({ adapterOptions: { payment_token: token } }))
        .then(() => this.transitionToRoute('register'));
    },

    didRemoveOrderLineItem(orderLineItem) {
      if (this.get('token')) orderLineItem.set('paymentToken', this.get('token'));

      return this._destroyAndRemove(orderLineItem)
        .catch(e => this.get('flash').alert(e));
    },


    didAddLineItem(lineItem) {
      const store = this.get('store');
      const order = this.get('order');

      return this._existingOrderLineItemForItem(lineItem)
        .then(orderLineItem => {
          if (isPresent(orderLineItem)) {
            if (this.get('token')) orderLineItem.set('paymentToken', this.get('token'));

            return this._addOneQuantityForOrderLineItem(orderLineItem);
          }

          return this._createOrderLineItemForItem(lineItem);
        })
        .catch(e => {
          this.get('rollbar').error('Problem with Org orderLineItem adding', e);
          this.get('flash').alert(e);
          this._cleanErroneousLineItems();
        });
    },

    didSubtractLineItem(lineItem) {
      return this._promiseWrappedOrder().then(order => {
        // do nothing if there are no order line items
        if (order.get('orderLineItems.length') === 0) return RSVP.resolve();

        // do nothing if quantity for an order line item is 0?
        return order.get('orderLineItems')
          .then(orderLineItems => {
            const oli = orderLineItems
              .filter(oli => oli.get('lineItem.id') === lineItem.id).get('firstObject');

            if (this.get('token')) oli.set('paymentToken', this.get('token'));

            if (oli) return this._subtractOneQuantityForOrderLineItem(oli);
          });
      }).catch(e => {
        this.get('rollbar').error('Problem with Org orderLineItem adding', e);
        this.get('flash').alert(e);
        this._cleanErroneousLineItems();
      });
    }
  }
});
