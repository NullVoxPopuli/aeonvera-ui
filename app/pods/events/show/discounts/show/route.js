import Ember from 'ember';
import Show from 'aeonvera/mixins/routes/crud/events/show';

export default Ember.Route.extend(Show, {
  modelName: 'discount',
  include: 'order_line_items.order.registration,restraints.restriction_for,restraints.restricted_to'
});
