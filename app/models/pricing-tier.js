import Ember from 'ember';
import DS from 'ember-data';
import LeadsAndFollows from '../mixins/models/has-leads-and-follows';

export default DS.Model.extend(LeadsAndFollows, {
  increaseBy: DS.attr('number'),
  increaseAfterDate: DS.attr('date'),
  increaseAfterTotalRegistrants: DS.attr('number'),
  isOpeningTier: DS.attr('boolean'),
  // restraints
  // allowed_packages
  // packages?

  event: DS.belongsTo('event'),
});
