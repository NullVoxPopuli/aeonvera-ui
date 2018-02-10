import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({

  model() {
    const event = this.modelFor('events.show');
    const eventId = event.get('id');
    const store = this.get('store');

    const emptyRecord = store.createRecord('events/registration');
    const registrations = emptyRecord
      .getDeleted({ event_id: eventId })
      // .then(() => {
      //   const results = store.peekAll('events/registration')
      //     .filter(r => r.get('host.id') == eventId && r.get('isDeleted'));
      //
      //   return RSVP.resolve(results);
      // })
      .finally(() => emptyRecord.deleteRecord());

    return {
      registrations,
      eventId
    };
  }
});
