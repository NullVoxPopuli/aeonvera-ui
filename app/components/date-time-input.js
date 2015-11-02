import Ember from 'ember';

export default Ember.Component.extend({

  date: function(){
    return moment(this.get('value'), 'YYYY-MM-DD');
  }.property('value'),

  time: function(){
    return moment(this.get('value'), 'HH:mm:ss');
  }.property('value'),



  actions: {
    // update
  }

});
