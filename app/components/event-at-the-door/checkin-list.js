import Ember from 'ember';

export default Ember.Component.extend({
  queryText: '',
  showOnlyNonCheckedIn: false,
  showOnlyThoseWhoOweMoney: false,

  attendances: function() {
    var model = this.get('model');
    var query = this.get('queryText');
    var queryPresent = Ember.isPresent(query);
    var onlyNonCheckedIn = this.get('showOnlyNonCheckedIn');
    var onlyOweMoney = this.get('showOnlyThoseWhoOweMoney');
    var lowerQuery = query.toLowerCase();

    return model.filter(function(ea){
      var show = true;

      if (queryPresent){
        var name = ea.get('attendeeName').toLowerCase();
        show = name.indexOf(lowerQuery) != -1;
      }

      if (show && onlyNonCheckedIn){
        show = !ea.get('isCheckedIn');
      }

      if (show  && onlyOweMoney){
        show = ea.get('owesMoney');
      }

      return show;
    });
  }.property(
    'model', 'queryText',
    'showOnlyNonCheckedIn', 'showOnlyThoseWhoOweMoney'),

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
  }.property('model.[]'),


  actions: {
    checkin: function(attendance){
      attendance.set('checkedInAt', Date.now());
      // attendance.save();
    }
  }

});
