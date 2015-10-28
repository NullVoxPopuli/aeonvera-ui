import Ember from 'ember';
import DS from 'ember-data';
import LeadsAndFollows from '../mixins/models/has-leads-and-follows';

export default DS.Model.extend(LeadsAndFollows, {
  increaseBy: DS.attr('string'),
  increaseAfterDate: DS.attr('date'),
  increaseAfterTotalRegistrants: DS.attr('number'),
  // restraints
  // allowed_packages
  // packages?

  event: DS.belongsTo('event'),

  increaseAfter: function(){

  }.property('increaseAfterDate', 'increaseAfterTotalRegistrants')
});
