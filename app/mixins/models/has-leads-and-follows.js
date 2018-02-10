import { isPresent } from '@ember/utils';
import Mixin from '@ember/object/mixin';
import DS from 'ember-data';

export default Mixin.create({
  numberOfLeads: DS.attr('number'),
  numberOfFollows: DS.attr('number'),

  // this field is optional for most items.
  // it's used when Lead/Follow status
  // doesn't matter.
  numberOfRegistrants: DS.attr('number'),
  totalAttendees: function() {
    const leads = this.get('numberOfLeads');
    const follows = this.get('numberOfFollows');

    return leads + follows;
  }.property('numberOfLeads', 'numberOfFollows'),

  totalRegistrants: function() {
    const numberOfRegistrants = this.get('numberOfRegistrants');
    const useDefinedTotal = isPresent(numberOfRegistrants);

    return useDefinedTotal ? numberOfRegistrants : this.get('totalAttendees');
  }.property('totalAttendees')
});
