import Ember from 'ember';
import RSVP from 'rsvp';

import { action } from 'ember-decorators/object';
import { alias, sort, oneWay } from 'ember-decorators/object/computed';
import { service } from 'ember-decorators/service';

import { dropTask } from 'ember-concurrency-decorators';

export default Ember.Controller.extend({
  @alias('model.registration') registration: null,
  @alias('model.event') event: null,
  @oneWay('model.registration.unpaidOrder') order: null,

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

    try {
      const order = yield this._ensureOrderExists();
      const orderLineItem = store.createRecord('orderLineItem', {
        ...params,
        lineItem,
        order
      });

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
  },


  _ensureOrderExists() {
    const order = this.get('order');

    return RSVP.resolve(order).then(o => {
      if (o !== null) return RSVP.resolve(o);

      const order = this.get('store').createRecord('order', {
        host: this.get('event'),
        user: this.get('currentUser'),
        userName: this.get('registration.name'),
        userEmail: this.get('registration.attendeeEmail'),
        registration: this.get('registration')
      });

      this.set('order', order);

      return order.save();
    });
  }
});
