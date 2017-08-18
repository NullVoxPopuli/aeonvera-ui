import DS from 'ember-data';
import LeadsAndFollows from '../mixins/models/has-leads-and-follows';

const { attr } = DS;

export default DS.Model.extend(LeadsAndFollows, {
  revenue: DS.attr('number'),
  revenueGross: attr('number'),
  revenueFees: attr('number'),

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
