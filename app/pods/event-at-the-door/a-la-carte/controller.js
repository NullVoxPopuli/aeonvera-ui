import Ember from 'ember';
import RSVP from 'rsvp';

import { controller } from 'ember-decorators/controller';
import { service } from 'ember-decorators/service';
import { action, computed } from 'ember-decorators/object';
import { alias } from 'ember-decorators/object/computed';

import Registration from 'aeonvera/mixins/registration/controller';
import { isA } from 'aeonvera/helpers/is-a';
// es6 mixin class decorator magic?
// const mixin = emberMixin => target => target.extend(emberMixin);

const TABS = [
  'event-at-the-door.a-la-carte.index',
  'event-at-the-door.a-la-carte.shirts',
  'event-at-the-door.a-la-carte.competitions',
  'event-at-the-door.a-la-carte.tickets',
  'event-at-the-door.a-la-carte.other'
];


// @mixin(Registration)
export default Ember.Controller.extend(Registration, {
  @controller('application') application: null,
  @service('flash-notification') flash: null,

  @alias('model') event: null,
  order: null,
  @alias('order.orderLineItems') orderLineItems: null,

  @computed('application')
  currentTabIndex(applicationController) {
    const currentRouteName = applicationController.get('currentRouteName');

    return TABS.indexOf(currentRouteName);
  },

  @action
  async add(lineItem) {
    await this.ensureOrderIsPersisted();

    if (this.requiresInput(lineItem)) {
      return this.newOrderLineItemFrom(lineItem);
    }

    return this.send('didAddLineItem', lineItem);
  },

  @action
  async remove(orderLineItem) {
    await this.ensureOrderIsPersisted();

    return this.send('didRemoveOrderLineItem', orderLineItem);
  },

  @action
  async onCancelOrder() {
    const order = await this._promiseWrappedOrder();

    try {
      await order.destroyRecord();

      this.set('order', null);
    } catch (e) {
      this.get('flash').error(e);
    }
  },

  @action
  startOver() {
    this.set('registration', null);
    this.set('order', null);
  },

  requiresInput(lineItem) {
    const isCompetition = isA([lineItem, 'competition']);
    const isShirt = isA([lineItem, 'shirt']);

    return isCompetition || isShirt;
  },

  async ensureOrderIsPersisted() {
    const order = this.get('order');
    const o = await RSVP.resolve(order);

    if (o !== null) {
      if (o.get('hasDirtyAttributes') && !o.get('isNew')) return o.save();

      return RSVP.resolve(o);
    }

    const newOrder = this.get('store').createRecord('order', {
      host: this.get('event'),
      user: this.get('currentUser'),
      userName: this.get('userName'),
      userEmail: this.get('userEmail'),
      registration: this.get('registration')
    });

    this.set('order', newOrder);

    return newOrder.save();
  }
});
