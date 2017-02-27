import Ember from 'ember';
import ResetScroll from 'aeonvera/mixins/routes/reset-scroll';

export default Ember.Route.extend(ResetScroll, {

  beforeModel() {
    const application = this.controllerFor('application');

    application.set('mobileMenuLeft', 'nav/welcome/left-items');
  },

  model: function(params) {
    const subdomain = params.subdomain;

    const promise = this.get('store').findRecord('host', subdomain, {
      adapterOptions: {
        query: {
          subdomain: subdomain
        }
      }
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

      const firstError = reason.errors[0];
      const errorObject = new Ember.Object(firstError);
      const status = firstError.code;

      // all errors are json api-formatted
      if (status === 404) {
        const controller = errorObject.get('meta.params.controller');

        if (controller && controller.includes('orders')) {
          // the order was not found, transition to the main
          // register route
          const subdomain = transition.params.register.subdomain;

          transition.abort();
          return this.transitionTo('register', subdomain);
        }

        transition.abort();
        return this.transitionTo('event-not-found');
      }

      // panic?
      console.error(reason);
      alert('a registration error has occurred, please notify support');

    }
  }
});
