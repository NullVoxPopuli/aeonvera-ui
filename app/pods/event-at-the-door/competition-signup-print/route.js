import Ember from 'ember';
import Show from 'aeonvera/mixins/routes/crud/events/show';

export default Ember.Route.extend(Show, {
  modelName: 'competition',
  parentPath: 'event-at-the-door',
  include: 'order_line_items.order.registration'
});
