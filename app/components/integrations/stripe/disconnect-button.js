import Ember from 'ember';
import env from 'aeonvera/config/environment';

export default Ember.Component.extend({
  actions: {
    removeIntegration() {
      const to = this.get('to');
      const integration = to.get('stripeIntegration');

      if (Ember.isPresent(integration)) {
        integration.deleteRecord();
        return integration.save().then(record => {
          this.get('store').unloadRecord(record);
          to.set('hasStripeIntegration', false);

          const msg = 'Stripe integration succesfully removed';

          this.get('flashMessages').success(msg);
        });
      }
      to.set('hasStripeIntegration', false);
      const msg = 'integration attempted to be deleted, but was not found';

      this.get('flashMessages').alert(msg);

    }
  }
});
