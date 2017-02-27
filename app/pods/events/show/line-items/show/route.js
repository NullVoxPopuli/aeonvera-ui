import Ember from 'ember';
import Show from 'aeonvera/mixins/routes/crud/events/show';

export default Ember.Route.extend(Show, {
  modelName: 'line-item',
  include: 'order_line_items.order.attendance,attendances,attendances.package,attendances.level,attendances.attendee,attendances.order'

});
