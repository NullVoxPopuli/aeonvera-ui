import Ember from 'ember';

export default class extends Ember.Route {
  model() {
    const event = this.modelFor('event-at-the-door');

    return event.get('lineItems');
  }
}
