import Ember from 'ember';
import Show from 'aeonvera/mixins/routes/crud/events/show';

export default Ember.Route.extend(Show, {
  modelName: 'line-item',
  include: 'order_line_items.order.registration,registrations,registrations.package,registrations.level,registrations.attendee,registrations.order'

});
