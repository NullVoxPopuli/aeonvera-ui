import Ember from 'ember';

export default Ember.Component.extend({
  queryText: '',

  attendances: function() {
    var model = this.get('model');
    var query = this.get('queryText');
    var queryPresent = Ember.isPresent(query);

    return model.filter(function(ea){
      if (queryPresent){
          return ea.get('attendeeName').indexOf(query) != -1;
      }
      return ea;
    });
  }.property('model', 'queryText'),

  percentCheckedIn: function(){
    var checkedIn = this.get('numberCheckedIn');
    /* var checkedOut = this.get('numberCheckedOut'); */
    var total = this.get('model').get("length");
    var percent = checkedIn / total * 100;

    return percent;
  }.property('model.[]'),

  numberCheckedIn: function(){
    var model = this.get('model');
    return model.filterProperty('isCheckedIn', true).get('length');
  }.property('model.[]'),

  numberNotCheckedIn: function(){
    var model = this.get('model');
    return model.filterBy('isCheckedIn', false).get('length');
  }.property('model.[]')

});
