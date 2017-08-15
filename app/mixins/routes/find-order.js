import Ember from 'ember';

const includeString = `
stripe_refunds,
registration,
registration.custom_field_responses,registration.housing_request,
registration.housing_provision,host,
order_line_items.line_item.restraints,host.integrations`;

export default Ember.Mixin.create({
  _findOrder(id, queryParams) {
    const store = this.get('store');

    // the not-logged-in case
    if (queryParams.token) {
      return store.queryRecord('order', {
        id,
        include: includeString,
        payment_token: queryParams.token
      });
    }

    // if logged in
    return this.get('store').findRecord('order', id, {
      // the include string needs to be here so that the checkout review
      // can have everything loaded at once to correctly calculate prices.
      include: includeString
    });
  }
});
