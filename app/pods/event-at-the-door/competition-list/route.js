import Ember from 'ember';

export default Ember.Route.extend({
  eventId: null,
  event: null,
  eventName: 'why',

  beforeModel() {
    const fromRoute = this.modelFor('event-at-the-door');

    this.set('eventId', fromRoute.get('id'));
    this.set('event', fromRoute);
    return fromRoute;
  },

  model() {
    const host = this.get('event');
    const competitions = this.get('store').query('competition', {
      event_id: host.get('id'),
      include: 'order_line_items.order.attendance'
    });

    return {
      competitions,
      id: host.get('id')
    };
  }

});
