import Ember from 'ember';

export default Ember.Route.extend({


  model: function(){
    var fromRoute = this.modelFor('event-at-the-door');
    this.set('event', fromRoute);
    return Ember.RSVP.hash({
      attendances: this.store.query('event-attendance', { event_id: fromRoute.get('id')}),
      lineItems: this.store.query('line-item', { event_id: fromRoute.get('id'), active: true }),
      competitions: this.store.query('competition', { event_id: fromRoute.get('id')}),
      shirts: this.store.query('shirt', {event_id: fromRoute.get('id')})
    });
  },

});
