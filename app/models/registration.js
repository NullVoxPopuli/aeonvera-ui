import DS from 'ember-data';

import EventAttendance from 'aeonvera/models/event-attendance';

export const UNREGISTERED_ID = 'unregistered';

// TODO: get rid of attendances
export default EventAttendance.extend({
  orders: DS.hasMany('orders', { inverse: 'registration' }),
  unpaidOrder: DS.belongsTo('unpaidOrder', { async: true, inverse: 'registration' })
});
