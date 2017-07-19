import Ember from 'ember';
import DS from 'ember-data';
import { computed } from 'ember-decorators/object';

import EventAttendance from 'aeonvera/models/event-attendance';

const { isPresent } = Ember;

export const UNREGISTERED_ID = 'unregistered';

// TODO: get rid of attendances
export default EventAttendance.extend({
  orders: DS.hasMany('orders', { inverse: 'registration' }),
  unpaidOrder: DS.belongsTo('unpaidOrder', { async: true, inverse: 'registration' }),

  @computed('attendeeName', 'attendeeFirstName', 'attendeeLastName')
  name(attendeeName, attendeeFirstName, attendeeLastName) {
    if (isPresent(attendeeFirstName) || isPresent(attendeeLastName)) {
      return `${attendeeFirstName} ${attendeeLastName}`;
    }

    return attendeeName;

  }
});
