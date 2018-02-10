import Route from '@ember/routing/route';

export default Route.extend({
  model: function() {
    const event = this.modelFor('events.show');

    return this.store.query('order', {
      q: {
        host_id_eq: event.get('id'),
        host_type_eq: 'Event'
      }
    });
  }
});
