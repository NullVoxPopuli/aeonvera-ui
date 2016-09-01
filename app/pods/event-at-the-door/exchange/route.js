import Ember from 'ember';

export default Ember.Route.extend({
  model(params, transition) {
    const event = this.modelFor('event-at-the-door');
    const shirts = event.get('shirts');

    return {
      event,
      shirts
    };
  }
});
