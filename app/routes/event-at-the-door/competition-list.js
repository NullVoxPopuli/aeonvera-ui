import Ember from 'ember';

export default Ember.Route.extend({
  eventId: null,
  event: null,
  eventName: 'why',

  beforeModel() {
    var fromRoute = this.modelFor('event-at-the-door');
    this.set('eventId', fromRoute.get('id'));
    this.set('event', fromRoute);
    return fromRoute;
  },

  model() {
    var host = this.get('event');
    this.set('eventName', host.get('name'));
    return this.store.query('competition', { event_id: host.get('id') });
  },

  afterModel(model) {
    return model.getEach('competitionResponses');
  },

});
