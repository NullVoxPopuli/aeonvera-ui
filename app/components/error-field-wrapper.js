import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [
    'hasError:error:no-error', 'classes'
  ],

  hasError: function() {
    var errors = this.get('fieldErrors');
    return (errors.length > 0);
  }.property('fieldErrors'),

  fieldErrors: function() {
    var field = this.get('field');
    return (this.get('errors.' + field) || []);
  }.property('errors.[]')
});
