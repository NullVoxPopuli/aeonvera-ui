import Ember from 'ember';

import { action } from 'ember-decorators/object';
import { sort } from 'ember-decorators/object/computed';
import { service } from 'ember-decorators/service';

export default class extends Ember.Controller {
  @service('flash-notification') flash;

  @sort('model.registrations', function(a, b) {
    const ra = a.get('registeredAt');
    const rb = b.get('registeredAt');

    return (ra > rb && 1) || (ra < rb && -1) || 0;
  }) registrations;

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
