import Route from '@ember/routing/route';

export default Route.extend({
  model(params, transition) {
    const event = this.modelFor('event-at-the-door');
    const shirts = event.get('shirts');

    return {
      event,
      shirts
    };
  }
});
