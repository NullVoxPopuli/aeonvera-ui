import Ember from 'ember';
import ENV from 'aeonvera/config/environment';

import { computed } from 'ember-decorators/object';

export default Ember.Controller.extend({
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
    const unpaidParams = 'q%5Borders_paid_eq%5D=false&q%5Borders_sub_total_in_cents_gt%5D=0';

    return `${ENV.host}/api/events/registrations.csv?event_id=${eventId}&${unpaidParams}&`;
  }
});
