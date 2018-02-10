import Route from '@ember/routing/route';
import Show from 'aeonvera/mixins/routes/crud/events/show';

export default Route.extend(Show, {
  modelName: 'level',
  include: 'registrations,registrations.package,registrations.level,registrations.attendee,registrations.order'

});
