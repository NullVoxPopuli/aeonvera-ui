import Mixin from '@ember/object/mixin';
import { service } from 'ember-decorators/service';

import { dropTask } from 'ember-concurrency-decorators';

import EnsureOrderExists from 'aeonvera/mixins/registration/ensure-order-exists';

// requires:
// - event
// - registration
// - order (registration.unpaidOrder)
export default Mixin.create(EnsureOrderExists, {
  @service('rollbar') rollbar: null,
  @service('flash-notification') flash: null,

  @dropTask
  addOrderLineItem: function * (lineItem, params) {
    const store = this.get('store');

    try {
      const order = yield this.ensureOrderExists('unpaidOrder');
      const orderLineItem = store.createRecord('orderLineItem', {
        ...params,
        lineItem,
        order
      });

      const saved = yield orderLineItem.save();

      this.get('order.orderLineItems').pushObject(saved);
    } catch (e) {
      console.warn(e);

      const code = e.errors && e.errors[0] && e.errors[0].code;

      // find a better way to do this...
      if (!code || code < 500) return;

      this.get('flash').error('An error occurred, please contact support.');
      this.get('rollbar').error(e);
    }
  }
});
