import DS from 'ember-data';
import LeadsAndFollows from '../mixins/models/has-leads-and-follows';

const { attr } = DS;

export default DS.Model.extend(LeadsAndFollows, {
  name: DS.attr('string'),
  revenue: DS.attr('number'),
  revenueGross: attr('number'),
  revenueFees: attr('number'),
  website: attr('string'),

  unpaid: DS.attr('number'),
  registrations: DS.hasMany('registrations', {
    async: false
  }),
  numberOfShirtsSold: DS.attr('number'),
  event: DS.belongsTo('event', {
    async: true
  }),

  recentRegistrations: function() {
    return this.get('registrations');
  }.property('registrations')

});
