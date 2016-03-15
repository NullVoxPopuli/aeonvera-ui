import Ember from 'ember';
import env from 'aeonvera/config/environment';

export default Ember.Component.extend({
  actions: {
    removeIntegration() {
      let to = this.get('to');
      let integration = to.get('stripeIntegration');
      if (Ember.isPresent(integration)) {
        integration.deleteRecord();
        integration.save().then(() => {
          to.set('hasStripeIntegration', false);
        });
      } else {
        console.warn('integration attempted to be deleted, but was not found');
      }
    }
  }
});
