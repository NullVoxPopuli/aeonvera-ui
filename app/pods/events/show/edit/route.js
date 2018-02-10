import Route from '@ember/routing/route';

export default Route.extend({

  model: function() {
    const eventModel = this.modelFor('events.show');

    return eventModel;

    // return this.store.find('event', eventSummary.get('id'));
  }
});
