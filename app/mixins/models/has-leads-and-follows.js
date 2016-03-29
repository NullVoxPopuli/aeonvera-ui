import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Mixin.create({
  numberOfLeads: DS.attr('number'),
  numberOfFollows: DS.attr('number'),
  // this field is optional for most items.
  // it's used when Lead/Follow status
  // doesn't matter.
  numberOfRegistrants: DS.attr('number'),
  totalAttendees: function () {
    var leads = this.get('numberOfLeads');
    var follows = this.get('numberOfFollows');

    return leads + follows;
  }.property('numberOfLeads', 'numberOfFollows'),

  totalRegistrants: function () {
    let numberOfRegistrants = this.get('numberOfRegistrants');
    let useDefinedTotal = Ember.isPresent(numberOfRegistrants);

    return useDefinedTotal ? numberOfRegistrants : this.get('totalAttendees');
  }.property('totalAttendees'),
});
