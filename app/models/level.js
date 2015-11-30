import DS from 'ember-data';
import LeadsAndFollows from '../mixins/models/has-leads-and-follows';

export default DS.Model.extend(LeadsAndFollows, {
  name: DS.attr('string'),
  requirement: DS.attr('number'),

  event: DS.belongsTo('event'),
  registrations: DS.hasMany('event-attendance', {
    async: true
  }),

  eventAttendances: DS.hasMany('event-attendance', {
    async: true
  })
});
