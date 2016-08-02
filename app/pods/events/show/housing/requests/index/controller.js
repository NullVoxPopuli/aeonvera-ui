import Ember from 'ember';
import ENV from 'aeonvera/config/environment';

export default Ember.Controller.extend({
  columns: [
    { property: 'requesterName', title: 'Name' },
    { property: 'attendance.hasPaid', title: 'Paid' },
    { property: '', title: 'Allergies' },
    { property: '', title: 'Requested', sort: false },
    { property: '', title: 'Unwanted', sort: false },
    { property: '', title: 'Can Transport', sort: false },
    { property: '', title: 'Notes', sort: false },
    { property: 'attendance.registeredAt', title: 'Registered At' }
  ],

  eventId: Ember.computed.alias('model.eventId'),
  requests: Ember.computed.alias('model.requests'),
  paramsForDownload: Ember.computed('model.eventId', {
    get(key) {
      return {
        event_id: this.get('model.eventId')
      };
    }
  }),

  path: Ember.computed('model.eventId', {
    get(key) {
      return `${ENV.host}/api/housing_requests.csv?`;
    }
  })
});
