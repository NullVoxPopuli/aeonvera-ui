import Ember from 'ember';

export default Ember.Component.extend({
  initFoundation: function() {
    Ember.$(document).foundation('reflow');
  }.on('didInsertElement'),

  paidClass: function(){
    let paid = this.get('model.paid');
    return paid ? 'success-color' : 'alert-color';
  }.property('model.paid')
});
