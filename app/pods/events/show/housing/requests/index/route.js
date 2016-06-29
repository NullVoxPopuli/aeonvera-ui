import Ember from 'ember';

export default Ember.Route.extend({

  model: function () {
    let event = this.modelFor('events.show');
    let housingStats = this.modelFor('events.show.housing');
    return this.store.query('housing-request', {
      event_id: event.get('id'),
      include: 'attendance'
    });
  },
});
