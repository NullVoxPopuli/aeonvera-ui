import Ember from 'ember';

export default Ember.Component.extend({
  errors: [],
  errorsPresent: Ember.computed('errors.@each', function() {
    return Ember.isPresent(this.get('errors'));
  }),

  firstError: Ember.computed('errors.@each', function() {
    let firstErrorObject = this.get('errors.firstObject');

    if (firstErrorObject === undefined){
      return;
    }

    let code = firstErrorObject.code;
    if (code === 401) {
      return 'Not authorized. Please login as an authorized user.';
    }

    let source = firstErrorObject.source;
    let field = source.pointer.replace('/data/attributes/', '');
    field = field.replace('-', ' ');

    let reason = firstErrorObject.message || firstErrorObject.detail;
    return field + ' ' + reason;
  }),

  actions: {
    hideError() {
      this.set('errorsPresent', false);
    },
  }

});
