import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    const event = this.modelFor('events.show');

    return this.store.query('events/registration', {
      event_id: event.get('id'),
      q: {
        ['orders_paid_eq']: false,
        ['orders_sub_total_in_cents_gt']: 0
      }
    });
  }
});
