import Ember from 'ember';

export default Ember.Component.extend({
  errors: [],
  errorsPresent: Ember.computed('errors.@each', function() {
    return Ember.isPresent(this.get('errors'));
  }),

  firstError: Ember.computed('errors.@each', function() {
    let firstErrorObject = this.get('errors.firstObject');

    return firstErrorObject.message || firstErrorObject.detail;
  }),

  actions: {
    hideError() {
      this.set('errorsPresent', false);
    },
  }

});
