import Ember from 'ember';

export default Ember.Controller.extend({
  flash: Ember.inject.service('flash-notification'),

  actions: {
    toNewRegistration() {
      this.transitionToRoute('register.event-registration.show.edit', 'unregistered');
    },

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
  } // end actions
});
