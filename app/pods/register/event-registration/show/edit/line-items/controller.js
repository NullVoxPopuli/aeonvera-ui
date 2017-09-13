import Ember from 'ember';
import { action } from 'ember-decorators/object';
import { alias, sort } from 'ember-decorators/object/computed';
import { service } from 'ember-decorators/service';

import { dropTask } from 'ember-concurrency-decorators';

export default Ember.Controller.extend({
  @alias('model.registration') registration: null,
  @alias('model.event') event: null,
  @alias('model.registration.unpaidOrder') order: null,

  sorts: ['name:asc'],
  @sort('model.event.lineItems', 'sorts') lineItems: null,

  @dropTask
  removeItem: function * (orderLineItem) {
    const oli = yield orderLineItem;

    yield oli.destroyRecord();
    this.get('order.orderLineItems').removeObject(orderLineItem);
  },

  @dropTask
  addItem: function * (lineItem, params) {
    const store = this.get('store');

    const orderLineItem = store.createRecord('orderLineItem', {
      ...params,
      lineItem
    });

    try {
      const savedOrderLineItem = yield orderLineItem.save();

      this.get('order.orderLineItems').pushObject(orderLineItem);
    } catch (e) {
      const code = e.errors && e.errors[0] && e.errors[0].code;

      // find a better way to do this...
      if (!code || code < 500) return;

      this.get('flash').error('An error occurred, please contact support.');
      this.get('rollbar').error(e);
    }
  },

  @action
  next() {
    const id = this.get('registration.id');

    this.transitionToRoute('register.event-registration.show.edit.housing', id);
  }
});
