import DS from 'ember-data';
import LeadsAndFollows from '../mixins/models/has-leads-and-follows';
import DeletedAt from '../mixins/models/deleted-at';

export default DS.Model.extend(LeadsAndFollows, DeletedAt, {
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
