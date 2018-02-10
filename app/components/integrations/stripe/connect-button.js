import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  torii: service(),
  flash: service('flash-notification'),
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
          const authorizationCode = result.authorizationCode;

          // create the integration record from the authorizationCode.
          // the server will be responsible for obtaining the auth credentials
          // from stripe -- which will allow this person to hook up events
          // to their stripe account.
          const integration = this.store.createRecord('integration', {
            name: 'stripe',
            authorizationCode: authorizationCode,
            owner: this.get('to')
          });

          integration.save().then(
            record => {
              const msg = 'Stripe succesfully connected. You may now receive payments electronically.';

              this.get('flash').success(msg);

              this.set('to.hasStripeIntegration', true);
              this.set('resetButton', true);
            }, error => {

              this.get('flash').alert(error);
            }
          );
        }, error => {

          this.get('flash').alert(error);
          this.set('resetButton', true);
        }
      );
    }
  }
});
