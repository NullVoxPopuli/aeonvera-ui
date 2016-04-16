import Ember from 'ember';

export default Ember.Route.extend({

  model: function (params) {
    let subdomain = params.subdomain;

    let promise = this.get('store').findRecord('host', subdomain, {
      adapterOptions: {
        query: {
          subdomain: subdomain,
          include: 'opening_tier,current_tier,line_items,shirts,integrations,packages,levels,competitions,lessons,membership_options,membership_discounts',
        },
      },
    });

    return promise;
  },

  actions: {
    error(reason, transition) {
      // all errors are json api-formatted
      let status = reason.errors[0].status;
      if (status === '404') {
        transition.abort();
        this.transitionTo('event-not-found');
      } else {
        // panic?
        alert('a registration error has occurred, please notify support');
      }
    }
  }
});
