## Module Report
### Unknown Global

**Global**: `Ember.String`

**Location**: `app/adapters/application.js` at line 15

```js
    const underscored = Ember.String.underscore(type);

    return Ember.String.pluralize(underscored);
  },

```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/models/order-line-item.js` at line 51

```js

    if (lineItem == null) {
      Ember.Logger.info('Order Line Item does not have lineItem loaded >_<');
      // can't proceed -- which is ok.
      return;
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/services/flash-notification.js` at line 74

```js
    notifier.error(message, options);

    Ember.Logger.error(e);
  },

```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/mixins/registration/controller.js` at line 17

```js

  _existingOrderLineItemForItem(lineItem) {
    Ember.Logger.info('_existingOrderLineItemForItem');

    const order = this.get('order');
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/mixins/registration/controller.js` at line 39

```js

  _updateOrCreateOrderLineItemForItem(oldLineItem, newLineItem) {
    Ember.Logger.info('_updateOrCreateOrderLineItemForItem');

    return this._promiseWrappedOrder()
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/mixins/registration/controller.js` at line 74

```js

  _createOrderLineItemForItem(lineItem, params = {}) {
    Ember.Logger.info('_createOrderLineItemForItem');

    const order = this.get('order');
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/mixins/registration/controller.js` at line 99

```js

  _refreshOrder() {
    Ember.Logger.info('_refreshOrder');

    // don't need to refresh if not authenticated.
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/mixins/registration/controller.js` at line 119

```js

  _subtractOneQuantityForOrderLineItem(orderLineItem) {
    Ember.Logger.info('_subtractOneQuantityForOrderLineItem');

    const nextQuantity = orderLineItem.get('quantity') - 1;
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `app/mixins/registration/controller.js` at line 135

```js

  _addOneQuantityForOrderLineItem(orderLineItem) {
    Ember.Logger.info('_addOneQuantityForOrderLineItem');

    orderLineItem.set('quantity', orderLineItem.get('quantity') + 1);
```
