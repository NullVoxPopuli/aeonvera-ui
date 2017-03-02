import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    const event = this.modelFor('events.show');
    const organizations = this.store.findAll('organization');
    const discountParams = { event_id: event.get('id') };
    const discounts = this.store.query('discount', discountParams);

    return {
      event: event,
      organizations: organizations,
      discounts: discounts
    };
  }
});
