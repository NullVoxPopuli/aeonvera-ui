import Ember from 'ember';
import ENV from 'aeonvera/config/environment';

export default Ember.Controller.extend({
  columns: [
    {property: 'name', title: 'Name'},
    // { property: 'schedule', title: 'Schedule' },
    {property: 'registrationOpensAt', title: 'Opens At'},
    {property: 'registrationClosesAt', title: 'Closes At'}
  ]

});
