import Ember from 'ember';

export default class extends Ember.Route {
  model() {
    return this.modelFor('events.show.packages.show');
  }
}
