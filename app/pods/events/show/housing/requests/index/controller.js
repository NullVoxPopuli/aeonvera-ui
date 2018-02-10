import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import ENV from 'aeonvera/config/environment';

export default Controller.extend({
  flash: service('flash-notification'),

  columns: [
    { property: 'requesterName', title: 'Name' },
    { property: 'housingProvision.providingName', title: 'Hosted By' },
    { property: '', title: 'Allergies' },
    { property: '', title: 'Requested', sort: false },
    { property: '', title: 'Unwanted', sort: false },
    { property: '', title: 'Can Transport', sort: false },
    { property: 'registration.registeredAt', title: 'Registered At' },
    { property: '', title: '', sort: false } // the delete button column
  ],

  eventId: alias('model.eventId'),
  provisions: alias('model.provisions'),
  requests: alias('model.requests'),
  paramsForDownload: computed('model.eventId', {
    get(key) {
      return {
        event_id: this.get('model.eventId')
      };
    }
  }),

  path: computed('model.eventId', {
    get(key) {
      return `${ENV.host}/api/housing_requests.csv?`;
    }
  }),

  actions: {
    delete(request) {
      request.destroyRecord().then(success => {
        this.get('flash').success('Request was deleted');
      }, error => {
        this.get('flash').error(error);
      });
    }
  }
});
