import Ember from 'ember';
import ResetScroll from 'aeonvera/mixins/routes/reset-scroll';
import SetNavbarTitle from 'aeonvera/mixins/routes/set-navbar-title';

export default Ember.Route.extend(ResetScroll, SetNavbarTitle, {
  headData: Ember.inject.service(),
  i18n: Ember.inject.service(),

  model: function(params) {
    const subdomain = params.subdomain;

    return this.get('store').findRecord('host', subdomain, {
      subdomain: subdomain
    });
  },

  afterModel(model, transition) {
    const name = model.get('name');
    const i18n = this.get('i18n');
    const head = this.get('headData');

    this._setAppNavTitle(name);
    head.set('title', `${name} - ${i18n.t('appname')}`);
  },

  actions: {
    eerror(reason, transition) {
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
