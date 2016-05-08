import Ember from 'ember';
import DS from 'ember-data';
import LeadsAndFollows from '../mixins/models/has-leads-and-follows';

export default DS.Model.extend(LeadsAndFollows, {
  increaseBy: DS.attr('number'),
  date: DS.attr('date'),
  registrants: DS.attr('number'),
  increaseAfterDate: Ember.computed.alias('date'),
  increaseAfterTotalRegistrants: Ember.computed.alias('registrants'),
  isOpeningTier: DS.attr('boolean'),

  event: DS.belongsTo('event'),
  attendances: DS.hasMany('attendance'),

  // because a nil value is handled as < 0
  // and we don't want that
  // this is ONLY used for sorting
  registrantsAlias: function () {
    let num = this.get('increaseAfterTotalRegistrants');

    if (!Ember.isPresent(num)) {
      return Infinity;
    }

    return num;
  }.property('increaseAfterTotalRegistrants'),
});
