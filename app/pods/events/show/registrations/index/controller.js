import Ember from 'ember';
import ENV from 'aeonvera/config/environment';

import { computed } from 'ember-decorators/object';

export default Ember.Controller.extend({
  columns: [
    { property: 'attendeeName', title: 'Name' },
    { property: 'danceOrientation', title: '' },
    { property: 'levelName', title: 'Level' },
    { property: 'paymentStatus', title: 'Payment' },
    { property: 'registeredAt', title: 'Registered At' }
  ],

  eventId: Ember.computed.alias('model.eventId'),
  registrations: Ember.computed.alias('model.registrations'),
  paramsForDownload: Ember.computed('model.eventId', {
    get(key) {
      return {
        event_id: this.get('model.eventId')
      };
    }
  }),

  @computed('model.eventId')
  path(eventId) {
    return `${ENV.host}/api/events/registrations.csv?event_id=${eventId}&`;
  }
});
