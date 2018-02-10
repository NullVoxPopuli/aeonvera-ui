import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import Controller from '@ember/controller';
import ENV from 'aeonvera/config/environment';

export default Controller.extend({
  columns: [
    { property: 'providingName', title: 'Name' },
    { property: 'housingCapacity', title: 'Capacity' },
    { property: 'numberOfShowers', title: 'Showers' },
    { property: 'registration.hasPaid', title: 'Paid' },
    { property: '', title: 'Allergens' },
    { property: '', title: 'Can Transport', sort: false },
    { property: '', title: 'Notes', sort: false },
    { property: 'registration.registeredAt', title: 'Registered At' },
    { property: '', title: '', sort: false } // the delete button column
  ],

  eventId: alias('model.eventId'),
  provisions: alias('model.provisions'),
  paramsForDownload: computed('model.eventId', {
    get(key) {
      return {
        event_id: this.get('model.eventId')
      };
    }
  }),

  path: computed('model.eventId', {
    get(key) {
      return `${ENV.host}/api/housing_provisions.csv?`;
    }
  }),

  actions: {
    delete(provision) {
      provision.destroyRecord().then(success => {
        this.get('flashMessages').success('Provision was deleted');
      }, error => {
        this.get('flashMessages').error(error);
      });
    }
  }
});
