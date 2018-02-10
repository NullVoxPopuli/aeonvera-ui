import Controller from '@ember/controller';
import ENV from 'aeonvera/config/environment';

export default Controller.extend({
  columns: [
    { property: 'name', title: 'Name' },
    // { property: 'schedule', title: 'Schedule' },
    { property: 'registrationOpensAt', title: 'Opens At' },
    { property: 'registrationClosesAt', title: 'Closes At' }
  ]

});
