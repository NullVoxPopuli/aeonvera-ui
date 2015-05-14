import Ember from 'ember';

export default Ember.View.extend({ //or Ember.Component.extend


  didInsertElement: function() {
    this.$().foundation(); //or Ember.$(document).foundation();
  },

});
