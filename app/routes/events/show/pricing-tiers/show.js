import Ember from 'ember';
import Show from 'aeonvera/mixins/routes/crud/events/show';

export default Ember.Route.extend(Show, {
  modelName: 'pricing-tier',
  include: 'registrations,registrations.package,registrations.level,registrations.attendee,registrations.order'
});
