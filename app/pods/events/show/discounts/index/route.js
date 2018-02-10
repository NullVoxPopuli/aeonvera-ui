import { computed } from '@ember/object';
import Route from '@ember/routing/route';
import Index from 'aeonvera/mixins/routes/crud/events/index';
import ENV from 'aeonvera/config/environment';

export default Route.extend(Index, {
  modelName: 'discount',

  setupController(controller, model) {
    this._super(...arguments);

    const event = this.modelFor('events.show');

    controller.set('eventId', event.get('id'));
  },

  downloadURL: computed(function() {
    return ENV.host + '/api/discounts.csv';
  })
});
