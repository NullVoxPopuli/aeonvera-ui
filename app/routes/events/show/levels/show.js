import Ember from 'ember';
import Show from 'aeonvera/mixins/routes/crud/events/show';

export default Ember.Route.extend(Show, {
  modelName: 'level',
  include: 'attendances,attendances.package,attendances.level,attendances.attendee,attendances.order',

});
