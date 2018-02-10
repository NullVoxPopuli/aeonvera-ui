import Route from '@ember/routing/route';
import Show from 'aeonvera/mixins/routes/crud/events/show';

export default Route.extend(Show, {
  modelName: 'discount',
  include: 'order_line_items.order.registration,restraints.restriction_for,restraints.restricted_to'
});
