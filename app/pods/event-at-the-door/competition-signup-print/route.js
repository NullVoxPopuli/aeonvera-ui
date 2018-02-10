import Route from '@ember/routing/route';
import Show from 'aeonvera/mixins/routes/crud/events/show';

export default Route.extend(Show, {
  modelName: 'competition',
  parentPath: 'event-at-the-door',
  include: 'order_line_items.order.registration'
});
