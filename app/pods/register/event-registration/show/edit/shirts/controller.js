import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { alias, sort, oneWay } from 'ember-decorators/object/computed';
import { dropTask } from 'ember-concurrency-decorators';

import OLIPersistence from 'aeonvera/mixins/registration/order-line-item-persistence';

export default Controller.extend(OLIPersistence, {
  flash: service('flash-notification'),
  rollbar: service('rollbar'),

  @alias('model.registration.unpaidOrder') order: null,
  @alias('model.registration') registration: null,
  @alias('model.event') event: null,

  @dropTask
  removeShirt: function * (orderLineItem) {
    // just in case it's a promise
    const oli = yield orderLineItem;

    try {
      yield oli.destroyRecord();
    } catch (e) {
      this.get('flash').alert('Could not remove shirt');
      this.get('rollbar').warning('deleting shirt orderLineItem', e);
    }
  },

  @dropTask
  addShirt: function * (size, shirt) {
    yield this.get('addOrderLineItem').perform(shirt, {
      size,
      quantity: 1
    });
  },

  actions: {
    updateShirt(orderLineItem, quantity) {
      orderLineItem.set('quantity', quantity);

      orderLineItem.save();
    },

    didFinishSelectingShirts() {
      this.transitionToRoute('register.event-registration.show.edit.competitions', this.get('model'));
    }
  }
});
