import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',

  actions: {
    pay: function(){

    },

    payViaCash: function(){

    },

    payViaCheck: function(){

    },

    checkin: function(attendance){
      attendance.set('checkedInAt', new Date());
      attendance.save();
    }

  }
});
