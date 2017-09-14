import Ember from 'ember';
import RSVP from 'rsvp';

import { action } from 'ember-decorators/object';
import { alias, sort, oneWay } from 'ember-decorators/object/computed';
import { service } from 'ember-decorators/service';

import { dropTask } from 'ember-concurrency-decorators';

import CurrentUserHelpers from 'aeonvera/mixins/current-user-helpers';
import OLIPersistence from 'aeonvera/mixins/registration/order-line-item-persistence';

export default Ember.Controller.extend(OLIPersistence, CurrentUserHelpers, {
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
    yield this.get('addOrderLineItem').perform(lineItem, params);
  },

  @action
  next() {
    const id = this.get('registration.id');

    this.transitionToRoute('register.event-registration.show.edit.housing', id);
  }
});
