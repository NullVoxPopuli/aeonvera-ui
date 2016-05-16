import Ember from 'ember';

export default Ember.Route.extend({

  model: function (params) {
    let subdomain = params.subdomain;

    let promise = this.get('store').findRecord('host', subdomain, {
      adapterOptions: {
        query: {
          subdomain: subdomain
        },
      },
    });

    return promise;
  },

  afterModel(model) {
    this.set('title', model.get('name'));
  },

  actions: {
    error(reason, transition) {
      if (reason.errors === undefined) {
        // This is a non-API error
        console.error(reason);
        console.error(transition);
        return;
      }

      let firstError = reason.errors[0];
      let errorObject = new Ember.Object(firstError);
      let status = firstError.code;

      // all errors are json api-formatted
      if (status === 404) {
        let controller = errorObject.get('meta.params.controller');

        if (controller && controller.includes('orders')) {
          // the order was not found, transition to the main
          // register route
          let subdomain = transition.params.register.subdomain;
          transition.abort();
          return this.transitionTo('register', subdomain);
        }

        transition.abort();
        return this.transitionTo('event-not-found');
      }

      // panic?
      alert('a registration error has occurred, please notify support');

    }
  }
});
