import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [
    'hasError:error:no-error', 'classes',
  ],

  /*
    do we want to also include the field name?
    most of the time the field will be accompanied
    by a label tag, so we won't need this.
  */
  includeFieldName: false,
  /*
    the name of the field to display when
    includeFieldName is true.
  */
  fieldName: '',

  hasError: function () {
    var errors = this.get('fieldErrors');
    return (errors.length > 0);
  }.property('fieldErrors'),

  fieldErrors: function () {
    var field = this.get('field');
    return (this.get('errors.' + field) || []);
  }.property('errors.[]'),
});
