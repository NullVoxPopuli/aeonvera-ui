import Ember from 'ember';
import DS from 'ember-data';
import LeadsAndFollows from '../mixins/models/has-leads-and-follows';

export default DS.Model.extend(LeadsAndFollows, {
  increaseBy: DS.attr('number'),
  increaseAfterDate: DS.attr('date'),
  increaseAfterTotalRegistrants: DS.attr('number'),
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
