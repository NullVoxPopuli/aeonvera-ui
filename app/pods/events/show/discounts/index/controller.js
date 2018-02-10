import { computed } from '@ember/object';
import Controller from '@ember/controller';
import ENV from 'aeonvera/config/environment';

export default Controller.extend({
  // set by route:
  // - eventId
  columns: [
    { property: 'code', title: 'Code' },
    { property: 'timesUsed', title: 'Times Used' },
    { property: 'discount', title: 'Discount' },
    { property: 'allowedPackages', title: 'Restricted To', sort: false }
  ],

  paramsForDownload: computed('eventId', {
    get(key) {
      return {
        event_id: this.get('eventId')
      };
    }
  }),

  path: computed('eventId', {
    get(key) {
      return `${ENV.host}/api/discounts.csv?`;
    }
  })
});
