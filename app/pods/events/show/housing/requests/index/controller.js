import Ember from 'ember';
import ENV from 'aeonvera/config/environment';

export default Ember.Controller.extend({
  flash: Ember.inject.service('flash-notification'),

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

  eventId: Ember.computed.alias('model.eventId'),
  provisions: Ember.computed.alias('model.provisions'),
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
