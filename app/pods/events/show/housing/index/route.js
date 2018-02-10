import Route from '@ember/routing/route';

export default Route.extend({

  model: function() {
    const event = this.modelFor('events.show');

    return this.store.findRecord('housing-stat', event.get('id'), { adapterOptions: { query: { event_id: event.get('id') } } });
  }
});
