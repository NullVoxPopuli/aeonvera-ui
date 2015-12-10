import Ember from 'ember';

export default Ember.Component.extend({

  timeOptions: function() {
    return {
      editable: true,
    };
  }.property(),

  dateOptions: function() {
    return {
      selectMonths: true,
      selectYears: true,
      onSet: function(context) {
        this.close();
      }
    };
  }.property()


});
