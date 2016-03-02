import Ember from 'ember';

export default Ember.Component.extend({
  initFoundation: function() {
    this.$(document).foundation('reflow');
  }.on('didInsertElement'),

});
