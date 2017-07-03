import Ember from 'ember';
import { task } from 'ember-concurrency';

const { inject } = Ember;

export default Ember.Controller.extend({
  flash: inject.service('flash-notification'),

  removeShirt: task(function * (orderLineItem) {
    // just in case it's a promise
    const oli = yield orderLineItem;

    try {
      yield oli.destroyRecord();
    } catch (e) {
      this.get('flash').alert('Could not remove shirt');
    }
  }),

  actions: {
    addShirt(size, shirt, order) {
      const store = this.get('store');

      const orderLineItem = store.createRecord('orderLineItem', {
        order: order,
        lineItem: shirt,
        size: size,
        quantity: 1
      });

      orderLineItem.save()
        .catch(e => {
          this.get('flash').alert('Could not add shirt');
          orderLineItem.unloadRecord();
        });
    },

    updateShirt(orderLineItem, quantity) {
      orderLineItem.set('quantity', quantity);

      orderLineItem.save();
    },

    didFinishSelectingShirts() {
      this.transitionToRoute('register.event-registration.show.index');
    }
  }
});
