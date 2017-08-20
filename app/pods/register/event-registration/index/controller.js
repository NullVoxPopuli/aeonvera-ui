import Ember from 'ember';

import { action } from 'ember-decorators/object';
import { sort } from 'ember-decorators/object/computed';
import { service } from 'ember-decorators/service';

export default class extends Ember.Controller {
  @service('flash-notification') flash;

  sortBy = ['registeredAt'];
  @sort('model.registrations', 'sortBy') registrations;

  @action
  toNewRegistration() {
    this.transitionToRoute('register.event-registration.show.edit', 'unregistered');
  }

  @action
  cancelRegistration(registration) {
    registration.get('orders').then(orders => {
      const hasPaidOrders = orders.map(o => o.get('paid')).some(o => o === true);

      if (!hasPaidOrders) {
        registration.destroyRecord();
      } else {
        this.get('flash').error('You cannot cancel when you have already paid.');
      }
    });
  }
}
