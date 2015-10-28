import DS from 'ember-data';
import LeadsAndFollows from '../mixins/models/has-leads-and-follows';

export default DS.Model.extend(LeadsAndFollows, {
  name: DS.attr('string'),
  requirement: DS.attr('string'),

  event: DS.belongsTo('event')
});
