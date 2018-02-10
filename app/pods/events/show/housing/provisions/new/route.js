import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  model() {
    const event = this.modelFor('events.show');
    const housingProvision = this.store.createRecord('housing-provision', {
      host: event
    });

    return RSVP.hash({ event, housingProvision });
  }
});
