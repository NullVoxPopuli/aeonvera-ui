import DS from 'ember-data';
import HostedEvent from '../models/hosted-event';

export default HostedEvent.extend({
  revenue: DS.attr('number'),
  unpaid: DS.attr('number'),
  eventAttendances: DS.hasMany('eventAttendances', { async: false }),

  recentRegistrations: function(){
    return this.get('eventAttendances');
  }.property('eventAttendances')

});
