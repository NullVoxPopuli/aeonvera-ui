import Ember from 'ember';
import ENV from 'aeonvera/config/environment';

export default Ember.Controller.extend({
  // set by route:
  // - eventId

  paramsForDownload: Ember.computed('eventId', {
    get(key) {
      return {
        event_id: this.get('eventId')
      };
    }
  }),

  path: Ember.computed('eventId', {
    get(key) {
      return `${ENV.host}/api/discounts.csv?`;
    }
  })
});
