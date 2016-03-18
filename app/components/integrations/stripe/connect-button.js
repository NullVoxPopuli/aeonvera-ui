import Ember from 'ember';

export default Ember.Component.extend({
  torii: Ember.inject.service(),
  resetButton: false,

  actions: {
    createIntegration() {
      return this.get('torii').open('stripe-connect').then(
        result => {
          /*
            result will contain:
             - authorizationCode: 'this is actually from stripe'
             - provider: 'stripe-connect',
             - redirectUri: 'whatever this is configured to'
          */
          let authorizationCode = result.authorizationCode;

          // create the integration record from the authorizationCode.
          // the server will be responsible for obtaining the auth credentials
          // from stripe -- which will allow this person to hook up events
          // to their stripe account.
          let integration = this.store.createRecord('integration', {
            name: 'stripe',
            authorizationCode: authorizationCode,
            owner: this.get('to')
          });

          integration.save().then(
            record => {
              let msg = 'Stripe succesfully connected. You may now receive payments electronically.';
              this.get('flashMessages').success(msg);

              this.set('to.hasStripeIntegration', true);
              this.set('resetButton', true);
            }, error => {

              this.get('flashMessages').alert(error);
            }
          );
        }, error => {

          this.get('flashMessages').alert(error);
          this.set('resetButton', true);
        }
      );
    }
  },
});
