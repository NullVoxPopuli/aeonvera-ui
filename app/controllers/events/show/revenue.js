import Ember from 'ember';

export default Ember.Controller.extend({
  startTime: null,
  endTime: null,
  startDate: null,
  endDate: null,

  startDateTime: function(){
    let startDate = this.get('startDate');
    let parsed = null;

    if (Ember.isPresent(startDate)){
      parsed = moment(startDate);
    }

    console.log(parsed);
    console.log(startDate);
    console.log(parsed && parsed.toString());

    return parsed;
  }.property('startTime', 'startDate'),

  endDateTime: function(){
    let endDate = this.get('endDate');
    let parsed = null;

    if (Ember.isPresent(endDate)){
      parsed = moment(endDate);
    }

    return parsed;
  }.property('endTime', 'endDate'),


  filteredOrders: function(){
    let model = this.get('model');
    let startTime = this.get('startDateTime');
    let endTime = this.get('endDateTime');

    let filtered = model;

    if (startTime != null){
      filtered = filtered.filter(function(item){
        let time = item.get('createdAt');
        let isAfterStartTime = moment(time).isAfter(startTime);
        return isAfterStartTime;
      });
    }

    if (endTime != null){
      filtered = filtered.filter(function(item){
        let time = item.get('createdAt');
        let isBeforeEndTime = moment(time).isBefore(endTime);
        return isBeforeEndTime;
      });
    }

    return filtered;
  }.property('model', 'startDateTime', 'endDateTime'),

  actions: {
    updateTime: function(time){
      console.log(time);
    }
  }
});
