import Ember from 'ember';
import string from 'aeonvera/mixins/helpers/string';

export default Ember.Component.extend(string, {
  initFoundation: function () {
    this.$(document).foundation('reflow');
  }.on('didInsertElement'),

  randomId: Ember.computed(function() {
    return this.get('randomString')();
  }).readOnly(),
});
