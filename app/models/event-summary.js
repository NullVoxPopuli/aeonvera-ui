import DS from 'ember-data';
import HostedEvent from '../models/hosted-event';

export default HostedEvent.extend({
  revenue: DS.attr('number'),
  unpaid: DS.attr('number'),
  recentRegistrations: DS.hasMany('attendances')
});
