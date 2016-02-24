import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Mixin.create({
  numberOfLeads: DS.attr('number'),
  numberOfFollows: DS.attr('number'),

  totalAttendees: function () {
    var leads = this.get('numberOfLeads');
    var follows = this.get('numberOfFollows');

    return leads + follows;
  }.property('numberOfLeads', 'numberOfFollows'),

  totalRegistrants: function () {
    return this.get('totalAttendees');
  }.property('totalAttendees'),
});
