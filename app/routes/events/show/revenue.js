import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    let event = this.modelFor('events.show');
    return this.store.query('order', {
      q: {
        host_id_eq: event.get('id'),
        host_type_eq: 'Event',
      },
    });
  },
});
