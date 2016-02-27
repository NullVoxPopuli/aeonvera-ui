import Ember from 'ember';

export default Ember.Route.extend({

  model: function (params, transition) {
    let id = transition.params['event-at-the-door'].event_id;
    let promise = this.store.findRecord('event', id, {
      adapterOptions: {
        query: {
          include: 'shirts,integrations,competitions,line_items,attendances'
        }
      }
    });

    return promise;
  },

});
