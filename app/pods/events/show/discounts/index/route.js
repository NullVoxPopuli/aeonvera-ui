import Ember from 'ember';
import Index from 'aeonvera/mixins/routes/crud/events/index';
import ENV from 'aeonvera/config/environment';

export default Ember.Route.extend(Index, {
  modelName: 'discount',

  setupController(controller, model) {
    this._super(...arguments);

    const event = this.modelFor('events.show');

    controller.set('eventId', event.get('id'));
  },

  downloadURL: Ember.computed(function() {
    return ENV.host + '/api/discounts.csv';
  })
});
