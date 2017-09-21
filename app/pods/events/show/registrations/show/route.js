import Ember from 'ember';


const include = Ember.String.w(`
  custom_field_responses
  housing_request
  housing_provision
  orders.order_line_items.line_item.restraints
  orders.stripe_refunds
  level
  host.levels
`)

export default Ember.Route.extend({

  model: function(params) {
    const event = this.modelFor('events.show');

    return this.store.findRecord('events/registration', params.registration_id, {
      adapterOptions: {
        query: {
          event_id: event.get('id'),
          include
        }
      }
    });
  }
});
