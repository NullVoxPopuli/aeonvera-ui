import Ember from 'ember';

export default Ember.Component.extend({
  title: 'Choose Payment Method',
  /*
    if -1 is shown, something will be wrong,
    as it means the amount owed by the attendee is unknown.


    This
  */
  amount: -1,

  checkNumber: '',

  payeeName: function(){
    return this.get('model.attendeeName');
  }.property('model'),

  actions: {
    pay: function(){

    }
  }

});
