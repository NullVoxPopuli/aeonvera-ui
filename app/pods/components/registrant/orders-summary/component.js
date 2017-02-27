import Ember from 'ember';

export default Ember.Component.extend({
  initFoundation: function() {
    Ember.$(document).foundation('reflow');
  }.on('didInsertElement'),

  lastItem: Ember.computed.alias('model.lastItem')
});
