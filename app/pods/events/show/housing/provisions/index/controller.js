import Ember from 'ember';
import ENV from 'aeonvera/config/environment';

export default Ember.Controller.extend({
  columns: [
    { property: 'providingName', title: 'Name' },
    { property: 'housingCapacity', title: 'Capacity' },
    { property: 'numberOfShowers', title: 'Showers' },
    { property: 'attendance.hasPaid', title: 'Paid' },
    { property: '', title: 'Allergens' },
    { property: '', title: 'Can Transport', sort: false },
    { property: '', title: 'Notes', sort: false },
    { property: 'attendance.registeredAt', title: 'Registered At' }
  ],

  eventId: Ember.computed.alias('model.eventId'),
  provisions: Ember.computed.alias('model.provisions'),
  paramsForDownload: Ember.computed('model.eventId', {
    get(key) {
      return {
        event_id: this.get('model.eventId')
      };
    }
  }),

  path: Ember.computed('model.eventId', {
    get(key) {
      return `${ENV.host}/api/housing_provisions.csv?`;
    }
  })
});
