import Ember from 'ember';

export default Ember.Component.extend({
  torii: Ember.inject.service(),
  resetButton: false,

  actions: {
    createIntegration() {
      return this.get('torii').open('stripe-connect').then(
        result => {
          this.set('authorizationCode', result.authorizationCode);
          console.log(result);
        }, error => {
          this.get('flashMessages').alert(error);
          this.set('resetButton', true);
        }
      );
    }
  }
});
