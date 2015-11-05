import DS from 'ember-data';
import LeadsAndFollows from '../mixins/models/has-leads-and-follows';

export default DS.Model.extend(LeadsAndFollows, {
  revenue: DS.attr('number'),
  unpaid: DS.attr('number'),
  eventAttendances: DS.hasMany('eventAttendances', { async: false }),
  numberOfShirtsSold: DS.attr('number'),

  recentRegistrations: function(){
    return this.get('eventAttendances');
  }.property('eventAttendances')

});
