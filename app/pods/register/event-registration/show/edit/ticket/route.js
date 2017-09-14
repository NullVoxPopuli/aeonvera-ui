import Ember from 'ember';
import RSVP from 'rsvp';

const { isBlank, inject } = Ember;

export default Ember.Route.extend({
  flash: inject.service('flash-notification'),

  model() {
    return this.modelFor('register.event-registration.show');
  },

  afterModel(model) {
    const event = model.event;

    if (!event.get('hasTickets')) {
      this.transitionTo('register.event-registration.show.edit.line-items');
    }
  },

  setupController(controller, model) {
    const registration = model.registration;
    const shouldUpdate = controller.get('registration.id') !== registration.id;

    const orderLineItems = registration.get('unpaidOrder.orderLineItems');
    const pack = orderLineItems && orderLineItems
      .map(oli => oli.get('lineItem'))
      .find(li => li.get('klass') === 'Package');

    if (shouldUpdate) {
      controller.set('model', model);
      // controller.set('registration', registration);
      controller.set('selectedPackage', pack);
      // controller.set('selectedLevel', null);
      // controller.set('order', registration.get('unpaidOrder'));
    }

    this._super(controller, model);
  },
});
