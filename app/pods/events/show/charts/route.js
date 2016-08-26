import Ember from 'ember';

export default Ember.Route.extend({

  model(params, transition) {
    let id = transition.params['events.show'].event_id;
    return this.store.findRecord('chart', `${id}-income-and-registration`, {
      adapterOptions: {
        query: {
          event_id: id,
          chart_type: 'line-income-and-registrations'
        }
      }
    });
  },
});
