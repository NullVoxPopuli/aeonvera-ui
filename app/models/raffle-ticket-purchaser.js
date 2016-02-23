import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  attendanceId: DS.attr('number'),
  numberOfTicketsPurchased: DS.attr('number')
});
