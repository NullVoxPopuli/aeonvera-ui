import Route from '@ember/routing/route';
import EmberObject from '@ember/object';
import { action } from 'ember-decorators/object';
import { service } from 'ember-decorators/service'

export default class extends Route {
  @service('flash-notification') flash;
  model(params) {
    const subdomain = params.subdomain;

    return this.get('store').findRecord('host', subdomain);
  }

  @action
  error(reason, transition) {
    const flash = this.get('flash');
    if (reason.errors === undefined) {
      this._super(...arguments);
    }

    const firstError = reason.errors[0];
    const errorObject = new EmberObject(firstError);
    const status = firstError.code;

    // all errors are json api-formatted
    if (status === 404) {
      const controller = errorObject.get('meta.params.controller');

      if (controller && controller.includes('orders')) {
        // the order was not found, transition to the main
        // register route
        const subdomain = transition.params.register.subdomain;

        transition.abort();
        flash.error('order not found');
        return this.transitionTo('register', subdomain);
      }

      transition.abort();
      flash.error('Event not found');
      return this.transitionTo('event-not-found');
    }

    this._super(...arguments);
  }
}
