import Ember from 'ember';

const includeString = `
stripe_refunds,
attendance,
attendance.custom_field_responses,attendance.housing_request,
attendance.housing_provision,host,
order_line_items.line_item.restraints,host.integrations`;

export default Ember.Mixin.create({
  _findOrder(id) {
    return this.get('store').findRecord('order', id, {
      // the include string needs to be here so that the checkout review
      // can have everything loaded at once to correctly calculate prices.
      include: includeString
    });
  }
});
