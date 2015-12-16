import Ember from 'ember';

export default Ember.Component.extend({

  timeOptions: function() {
    return {
      editable: true,
      interval: 1
    };
  }.property(),

  dateOptions: function() {
    return {
      selectMonths: true,
      selectYears: true
    };
  }.property()


});
