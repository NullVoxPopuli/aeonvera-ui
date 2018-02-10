import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import Controller from '@ember/controller';
import ENV from 'aeonvera/config/environment';

export default Controller.extend({
  columns: [
    { property: 'userName', title: 'Name' },
    { property: 'currentPaidAmount', title: 'Paid Amount' },
    { property: 'paid', title: 'Paid' },
    { property: 'createdAt', title: 'Created At' },
    { property: '', title: 'Registration', sort: false }
  ],

  eventId: alias('model.eventId'),
  orders: alias('model.orders'),
  paramsForDownload: computed('model.eventId', {
    get(key) {
      return {
        event_id: this.get('model.eventId')
      };
    }
  }),

  path: computed('model.eventId', {
    get(key) {
      return `${ENV.host}/api/orders.csv?`;
    }
  })
});
