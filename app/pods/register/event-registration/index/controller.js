import Ember from 'ember';

import { action, computed } from 'ember-decorators/object';
import { sort, equal, gt } from 'ember-decorators/object/computed';
import { service } from 'ember-decorators/service';

export default Ember.Controller.extend({
  @service('flash-notification') flash: null,

  sortBy: ['registeredAt'],
  @sort('model.registrations', 'sortBy') registrations: null,

  @equal('registrations.length', 0) hasNotRegistered: null,
  @gt('registrations.length', 1) moreThanOneRegistration: null,

  @computed('moreThanOneRegistration')
  subHeaderText(moreThanOne) {
    if (moreThanOne) return 'Your Registrations';

    return 'Your Registration';
  },

  @action
  toNewRegistration() {
    this.transitionToRoute('register.event-registration.show.edit', 'unregistered');
  },

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
});
