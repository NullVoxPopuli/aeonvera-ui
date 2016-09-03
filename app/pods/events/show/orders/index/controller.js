import Ember from 'ember';
import ENV from 'aeonvera/config/environment';

export default Ember.Controller.extend({
  columns: [
    { property: 'userName', title: 'Name' },
    { property: 'currentPaidAmount', title: 'Paid Amount' },
    { property: 'paid', title: 'Paid' },
    { property: 'createdAt', title: 'Created At' },
    { property: '', title: 'Registration', sort: false }
  ],

  eventId: Ember.computed.alias('model.eventId'),
  orders: Ember.computed.alias('model.orders'),
  paramsForDownload: Ember.computed('model.eventId', {
    get(key) {
      return {
        event_id: this.get('model.eventId')
      };
    }
  }),

  path: Ember.computed('model.eventId', {
    get(key) {
      return `${ENV.host}/api/orders.csv?`;
    }
  })
});
