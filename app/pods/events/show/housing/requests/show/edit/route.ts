import Ember from 'ember';
import RSVP from 'rsvp';

export default class extends Ember.Route {
  model(params, transition) {
    return this.modelFor('events.show.housing.requests.show');
  }
}
