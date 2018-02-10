import { isPresent } from '@ember/utils';
import { alias } from '@ember/object/computed';
import DS from 'ember-data';
import LeadsAndFollows from '../mixins/models/has-leads-and-follows';

export default DS.Model.extend(LeadsAndFollows, {
  increaseByDollars: DS.attr('number'),
  date: DS.attr('date'),
  registrants: DS.attr('number'),
  increaseBy: alias('increaseByDollars'),
  increaseAfterDate: alias('date'),
  increaseAfterTotalRegistrants: alias('registrants'),
  isOpeningTier: DS.attr('boolean'),

  event: DS.belongsTo('event'),
  registrations: DS.hasMany('registration'),

  // because a nil value is handled as < 0
  // and we don't want that
  // this is ONLY used for sorting
  registrantsAlias: function() {
    const num = this.get('increaseAfterTotalRegistrants');

    if (!isPresent(num)) {
      return Infinity;
    }

    return num;
  }.property('increaseAfterTotalRegistrants')
});
