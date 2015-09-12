import Ember from 'ember';

export default Ember.Controller.extend({
  startTime: null,
  endTime: null,
  startDate: null,
  endDate: null,

  startDateTime: function(){
    let startDate = this.get('startDate');
    let startTime = this.get('startTime');
    let parsed = null;

    if (Ember.isPresent(startDate)){
      parsed = moment(startDate);
    }

    if (Ember.isPresent(startTime)){
      let timeArray = startTime.split(':');
      let hours = timeArray[0];
      let minutes = timeArray[1];
      parsed.hours(hours);
      parsed.minutes(minutes);
    }

    return parsed;
  }.property('startTime', 'startDate'),

  endDateTime: function(){
    let endDate = this.get('endDate');
    let endTime = this.get('endTime');
    let parsed = null;

    if (Ember.isPresent(endDate)){
      parsed = moment(endDate);
    }

    if (Ember.isPresent(endTime)){
      let timeArray = endTime.split(':');
      let hours = timeArray[0];
      let minutes = timeArray[1];
      parsed.hours(hours);
      parsed.minutes(minutes);
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
