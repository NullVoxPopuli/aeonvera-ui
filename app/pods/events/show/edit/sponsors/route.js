import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    let event = this.modelFor('events.show');
    let organizations = this.store.findAll('organization');
    let discountParams = { event_id: event.get('id') };
    let discounts = this.store.query('discount', discountParams);

    return {
      event: event,
      organizations: organizations,
      discounts: discounts
    };
  }
});
